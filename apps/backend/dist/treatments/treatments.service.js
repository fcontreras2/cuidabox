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
exports.TreatmentsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_module_1 = require("../supabase/supabase.module");
let TreatmentsService = class TreatmentsService {
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
        const { data: treatment, error } = (await this.supabase
            .from('treatments')
            .insert({
            patient_id: patientId,
            title: dto.title,
            start_date: dto.start_date,
            end_date: dto.end_date,
            appointment_id: dto.appointment_id,
            created_by: userId,
        })
            .select()
            .single());
        if (error)
            throw new Error(error.message);
        const steps = [];
        if (dto.steps?.length) {
            for (const stepDto of dto.steps) {
                const step = await this.createStep(treatment.id, stepDto);
                steps.push(step);
            }
        }
        return { ...treatment, steps };
    }
    async createStep(treatmentId, dto) {
        const { data: step, error } = (await this.supabase
            .from('treatment_steps')
            .insert({
            treatment_id: treatmentId,
            order: dto.order,
            depends_on_step_id: dto.depends_on_step_id,
            type: dto.type,
            title: dto.title,
            description: dto.description,
            start_offset_days: dto.start_offset_days ?? 0,
            duration_days: dto.duration_days,
        })
            .select()
            .single());
        if (error)
            throw new Error(error.message);
        let medication = null;
        if (dto.type === 'medication' && dto.medication) {
            const { data: med, error: medError } = (await this.supabase
                .from('treatment_step_medications')
                .insert({
                step_id: step.id,
                ...dto.medication,
            })
                .select()
                .single());
            if (medError)
                throw new Error(medError.message);
            medication = med;
        }
        return { ...step, medication };
    }
    async findAll(patientId, userId) {
        await this.assertAccess(patientId, userId);
        const { data: treatments } = (await this.supabase
            .from('treatments')
            .select('*')
            .eq('patient_id', patientId)
            .order('created_at', { ascending: false }));
        if (!treatments?.length)
            return [];
        const result = [];
        for (const treatment of treatments) {
            const steps = await this.getSteps(treatment.id);
            result.push({ ...treatment, steps });
        }
        return result;
    }
    async findOne(patientId, treatmentId, userId) {
        await this.assertAccess(patientId, userId);
        const { data: treatment } = (await this.supabase
            .from('treatments')
            .select('*')
            .eq('id', treatmentId)
            .eq('patient_id', patientId)
            .single());
        if (!treatment)
            throw new common_1.NotFoundException('Tratamiento no encontrado');
        const steps = await this.getSteps(treatmentId);
        return { ...treatment, steps };
    }
    async updateStatus(patientId, treatmentId, status, userId) {
        await this.assertAccess(patientId, userId);
        const { data: treatment, error } = (await this.supabase
            .from('treatments')
            .update({ status })
            .eq('id', treatmentId)
            .eq('patient_id', patientId)
            .select()
            .single());
        if (error || !treatment)
            throw new common_1.NotFoundException('Tratamiento no encontrado');
        const steps = await this.getSteps(treatmentId);
        return { ...treatment, steps };
    }
    async getSteps(treatmentId) {
        const { data: steps } = (await this.supabase
            .from('treatment_steps')
            .select('*')
            .eq('treatment_id', treatmentId)
            .order('order', { ascending: true }));
        if (!steps?.length)
            return [];
        const result = [];
        for (const step of steps) {
            const { data: med } = (await this.supabase
                .from('treatment_step_medications')
                .select('*')
                .eq('step_id', step.id)
                .single());
            result.push({ ...step, medication: med ?? null });
        }
        return result;
    }
};
exports.TreatmentsService = TreatmentsService;
exports.TreatmentsService = TreatmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], TreatmentsService);
//# sourceMappingURL=treatments.service.js.map