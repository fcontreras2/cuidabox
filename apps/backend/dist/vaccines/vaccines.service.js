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
exports.VaccinesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_module_1 = require("../supabase/supabase.module");
let VaccinesService = class VaccinesService {
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
            .from('vaccines')
            .insert({ patient_id: patientId, ...dto })
            .select()
            .single());
        if (error)
            throw new Error(error.message);
        return data;
    }
    async findAll(patientId, userId) {
        await this.assertAccess(patientId, userId);
        const { data } = (await this.supabase
            .from('vaccines')
            .select('*')
            .eq('patient_id', patientId)
            .order('administered_at', { ascending: false }));
        return data ?? [];
    }
    async remove(patientId, vaccineId, userId) {
        await this.assertAccess(patientId, userId);
        const { error } = await this.supabase
            .from('vaccines')
            .delete()
            .eq('id', vaccineId)
            .eq('patient_id', patientId);
        if (error)
            throw new common_1.NotFoundException('Vacuna no encontrada');
    }
};
exports.VaccinesService = VaccinesService;
exports.VaccinesService = VaccinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], VaccinesService);
//# sourceMappingURL=vaccines.service.js.map