"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientDoctorsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_module_1 = require("../supabase/supabase.module");
let PatientDoctorsService = class PatientDoctorsService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async assertHolderAccess(patientId, userId) {
        const { data } = await this.supabase
            .from('patient_holders')
            .select('patient_id')
            .eq('patient_id', patientId)
            .eq('user_id', userId)
            .single();
        if (!data)
            throw new common_1.ForbiddenException('No tienes acceso a este paciente');
    }
    async linkDoctor(patientId, email, userId) {
        await this.assertHolderAccess(patientId, userId);
        const { data: doctor } = (await this.supabase
            .from('users')
            .select('id, name, email, specialty_key, role')
            .eq('email', email)
            .eq('role', 'doctor')
            .single());
        if (!doctor)
            throw new common_1.NotFoundException('No se encontró un doctor con ese email en Cuidabox');
        const { data: existing } = await this.supabase
            .from('patient_doctors')
            .select('id, status')
            .eq('patient_id', patientId)
            .eq('user_id', doctor.id)
            .single();
        if (existing) {
            throw new common_1.ConflictException(`Este doctor ya está enlazado con estado: ${existing.status}`);
        }
        const { data: link, error } = (await this.supabase
            .from('patient_doctors')
            .insert({
            patient_id: patientId,
            user_id: doctor.id,
            status: 'pending',
            invited_by: userId,
        })
            .select()
            .single());
        if (error)
            throw new Error(error.message);
        return this.mapRow(link, doctor);
    }
    async findAll(patientId, userId) {
        await this.assertHolderAccess(patientId, userId);
        const { data: links } = (await this.supabase
            .from('patient_doctors')
            .select('*')
            .eq('patient_id', patientId)
            .order('created_at', { ascending: false }));
        if (!links?.length)
            return [];
        const result = [];
        for (const link of links) {
            const { data: doctor } = (await this.supabase
                .from('users')
                .select('id, name, email, specialty_key')
                .eq('id', link.user_id)
                .single());
            if (doctor)
                result.push(this.mapRow(link, doctor));
        }
        return result;
    }
    async updateStatus(patientId, linkId, status, userId) {
        const { data: link } = (await this.supabase
            .from('patient_doctors')
            .select('*')
            .eq('id', linkId)
            .eq('patient_id', patientId)
            .single());
        if (!link)
            throw new common_1.NotFoundException('Enlace no encontrado');
        if (link.user_id !== userId)
            throw new common_1.ForbiddenException('Solo el doctor puede aceptar o rechazar el enlace');
        if (link.status !== 'pending')
            throw new common_1.BadRequestException('El enlace ya fue procesado');
        const { data: updated, error } = (await this.supabase
            .from('patient_doctors')
            .update({ status })
            .eq('id', linkId)
            .select()
            .single());
        if (error || !updated)
            throw new Error('Error al actualizar el enlace');
        const { data: doctor } = (await this.supabase
            .from('users')
            .select('id, name, email, specialty_key')
            .eq('id', link.user_id)
            .single());
        return this.mapRow(updated, doctor);
    }
    async remove(patientId, linkId, userId) {
        await this.assertHolderAccess(patientId, userId);
        const { error } = await this.supabase
            .from('patient_doctors')
            .delete()
            .eq('id', linkId)
            .eq('patient_id', patientId);
        if (error)
            throw new common_1.NotFoundException('Enlace no encontrado');
    }
    mapRow(row, doctor) {
        return {
            id: row.id,
            patient_id: row.patient_id,
            status: row.status,
            invited_by: row.invited_by,
            access_from: row.access_from,
            created_at: row.created_at,
            doctor: {
                id: doctor.id,
                name: doctor.name,
                email: doctor.email,
                specialty_key: doctor.specialty_key,
            },
        };
    }
};
exports.PatientDoctorsService = PatientDoctorsService;
exports.PatientDoctorsService = PatientDoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], PatientDoctorsService);
//# sourceMappingURL=patient-doctors.service.js.map