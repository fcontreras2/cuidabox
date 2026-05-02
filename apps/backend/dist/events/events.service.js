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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_module_1 = require("../supabase/supabase.module");
let EventsService = class EventsService {
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
    async getTimeline(patientId, userId) {
        await this.assertAccess(patientId, userId);
        const { data: vaccines } = (await this.supabase
            .from('vaccines')
            .select('id, name, dose_number, administered_at, administered_by, notes')
            .eq('patient_id', patientId));
        const { data: vitals } = (await this.supabase
            .from('vitals')
            .select('id, weight_kg, height_cm, temperature_c, heart_rate, notes, recorded_at, recorded_by')
            .eq('patient_id', patientId));
        const { data: events } = (await this.supabase
            .from('events')
            .select('id, type, occurred_at, payload, created_by')
            .eq('patient_id', patientId));
        const timeline = [
            ...(vaccines ?? []).map((v) => ({
                id: v.id,
                type: 'vaccine',
                occurred_at: v.administered_at ?? '',
                payload: v,
                created_by: null,
            })),
            ...(vitals ?? []).map((v) => ({
                id: v.id,
                type: 'vital',
                occurred_at: v.recorded_at,
                payload: v,
                created_by: v.recorded_by,
            })),
            ...(events ?? []).map((e) => ({
                id: e.id,
                type: e.type,
                occurred_at: e.occurred_at,
                payload: e.payload,
                created_by: e.created_by,
            })),
        ];
        return timeline.sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime());
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], EventsService);
//# sourceMappingURL=events.service.js.map