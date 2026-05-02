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
exports.PatientsService = exports.CreatePatientDto = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_module_1 = require("../supabase/supabase.module");
class CreatePatientDto {
    name;
    birthdate;
    gender;
    blood_type;
    notes;
    insurance_provider;
    insurance_policy_number;
    relationship;
}
exports.CreatePatientDto = CreatePatientDto;
let PatientsService = class PatientsService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async create(dto, userId) {
        const { data: patient, error } = (await this.supabase
            .from('patients')
            .insert({
            name: dto.name,
            birthdate: dto.birthdate,
            gender: dto.gender,
            blood_type: dto.blood_type,
            notes: dto.notes,
            insurance_provider: dto.insurance_provider,
            insurance_policy_number: dto.insurance_policy_number,
            created_by: userId,
        })
            .select()
            .single());
        if (error)
            throw new Error(error.message);
        await this.supabase.from('patient_holders').insert({
            patient_id: patient.id,
            user_id: userId,
            relationship: dto.relationship ?? 'parent',
            is_primary: true,
        });
        return patient;
    }
    async findAllByHolder(userId) {
        const { data } = (await this.supabase
            .from('patient_holders')
            .select('patients(*)')
            .eq('user_id', userId));
        return (data ?? []).map((row) => row.patients);
    }
    async findOne(id, userId) {
        const { data } = (await this.supabase
            .from('patient_holders')
            .select('patients(*)')
            .eq('user_id', userId)
            .eq('patient_id', id)
            .single());
        if (!data)
            throw new common_1.NotFoundException('Patient not found');
        return data.patients;
    }
    async update(id, dto, userId) {
        const { data: access } = await this.supabase
            .from('patient_holders')
            .select('patient_id')
            .eq('patient_id', id)
            .eq('user_id', userId)
            .single();
        if (!access)
            throw new common_1.ForbiddenException('No tienes acceso a este paciente');
        const fields = {};
        if (dto.name !== undefined)
            fields.name = dto.name;
        if (dto.birthdate !== undefined)
            fields.birthdate = dto.birthdate;
        if (dto.gender !== undefined)
            fields.gender = dto.gender;
        if (dto.blood_type !== undefined)
            fields.blood_type = dto.blood_type;
        if (dto.notes !== undefined)
            fields.notes = dto.notes;
        if (dto.insurance_provider !== undefined)
            fields.insurance_provider = dto.insurance_provider;
        if (dto.insurance_policy_number !== undefined)
            fields.insurance_policy_number = dto.insurance_policy_number;
        const { data: patient, error } = (await this.supabase
            .from('patients')
            .update(fields)
            .eq('id', id)
            .select()
            .single());
        if (error || !patient)
            throw new Error('Error al actualizar el paciente');
        return patient;
    }
    async getSummary(id, userId) {
        const patient = await this.findOne(id, userId);
        const now = new Date().toISOString();
        const [{ data: lastAppointment }, { data: nextAppointment }, { data: lastVital }, { count: allergiesCount }, { count: treatmentsCount },] = await Promise.all([
            this.supabase
                .from('appointments')
                .select('id, title, scheduled_at, doctor_name')
                .eq('patient_id', id)
                .lt('scheduled_at', now)
                .order('scheduled_at', { ascending: false })
                .limit(1)
                .single(),
            this.supabase
                .from('appointments')
                .select('id, title, scheduled_at, doctor_name')
                .eq('patient_id', id)
                .gte('scheduled_at', now)
                .order('scheduled_at', { ascending: true })
                .limit(1)
                .single(),
            this.supabase
                .from('vitals')
                .select('id, type, value, recorded_at')
                .eq('patient_id', id)
                .order('recorded_at', { ascending: false })
                .limit(1)
                .single(),
            this.supabase
                .from('allergies')
                .select('*', { count: 'exact', head: true })
                .eq('patient_id', id),
            this.supabase
                .from('treatments')
                .select('*', { count: 'exact', head: true })
                .eq('patient_id', id)
                .eq('status', 'active'),
        ]);
        return {
            patient,
            last_appointment: lastAppointment ?? null,
            next_appointment: nextAppointment ?? null,
            last_vital: lastVital ?? null,
            active_allergies_count: allergiesCount ?? 0,
            active_treatments_count: treatmentsCount ?? 0,
        };
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], PatientsService);
//# sourceMappingURL=patients.service.js.map