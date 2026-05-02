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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_module_1 = require("../supabase/supabase.module");
let AppointmentsService = class AppointmentsService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async assertAccess(patientId, userId) {
        const { data } = await this.supabase
            .from('patient_holders')
            .select('patient_id')
            .eq('patient_id', patientId)
            .eq('user_id', userId)
            .single();
        if (!data)
            throw new common_1.ForbiddenException('No tienes acceso a este paciente');
    }
    async create(patientId, dto, userId) {
        await this.assertAccess(patientId, userId);
        const { data, error } = (await this.supabase
            .from('appointments')
            .insert({
            patient_id: patientId,
            doctor_id: dto.doctor_id ?? null,
            scheduled_at: dto.scheduled_at,
            notes: dto.notes ?? null,
            created_by: userId,
        })
            .select()
            .single());
        if (error)
            throw new Error(error.message);
        return data;
    }
    async findAll(patientId, userId) {
        await this.assertAccess(patientId, userId);
        const { data } = (await this.supabase
            .from('appointments')
            .select('*')
            .eq('patient_id', patientId)
            .order('scheduled_at', { ascending: false }));
        return data ?? [];
    }
    async findOne(patientId, appointmentId, userId) {
        await this.assertAccess(patientId, userId);
        const { data } = (await this.supabase
            .from('appointments')
            .select('*')
            .eq('id', appointmentId)
            .eq('patient_id', patientId)
            .single());
        if (!data)
            throw new common_1.NotFoundException('Cita no encontrada');
        return data;
    }
    async findUpcoming(userId, limit = 10) {
        const patientIds = await this.getHolderPatientIds(userId);
        if (!patientIds.length)
            return [];
        const now = new Date().toISOString();
        const { data } = (await this.supabase
            .from('appointments')
            .select('*')
            .in('patient_id', patientIds)
            .eq('status', 'scheduled')
            .gte('scheduled_at', now)
            .order('scheduled_at', { ascending: true })
            .limit(limit));
        return data ?? [];
    }
    async getHolderPatientIds(userId) {
        const { data } = (await this.supabase
            .from('patient_holders')
            .select('patient_id')
            .eq('user_id', userId));
        return (data ?? []).map((r) => r.patient_id);
    }
    async updateStatus(patientId, appointmentId, status, userId) {
        await this.assertAccess(patientId, userId);
        const { data, error } = (await this.supabase
            .from('appointments')
            .update({ status })
            .eq('id', appointmentId)
            .eq('patient_id', patientId)
            .select()
            .single());
        if (error || !data)
            throw new common_1.NotFoundException('Cita no encontrada');
        return data;
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map