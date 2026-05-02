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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_module_1 = require("../supabase/supabase.module");
let DocumentsService = class DocumentsService {
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
            .from('documents')
            .insert({
            patient_id: patientId,
            uploaded_by: userId,
            name: dto.name,
            file_url: dto.file_url,
            type: dto.type,
            treatment_id: dto.treatment_id ?? null,
            appointment_id: dto.appointment_id ?? null,
            exam_id: dto.exam_id ?? null,
        })
            .select()
            .single());
        if (error)
            throw new Error(error.message);
        return data;
    }
    async findAll(patientId, userId, filters) {
        await this.assertAccess(patientId, userId);
        let query = this.supabase
            .from('documents')
            .select('*')
            .eq('patient_id', patientId);
        if (filters?.treatment_id)
            query = query.eq('treatment_id', filters.treatment_id);
        if (filters?.appointment_id)
            query = query.eq('appointment_id', filters.appointment_id);
        if (filters?.exam_id)
            query = query.eq('exam_id', filters.exam_id);
        const { data } = (await query.order('uploaded_at', {
            ascending: false,
        }));
        return data ?? [];
    }
    async getSignedUrl(patientId, documentId, userId) {
        await this.assertAccess(patientId, userId);
        const { data: doc } = (await this.supabase
            .from('documents')
            .select('file_url')
            .eq('id', documentId)
            .eq('patient_id', patientId)
            .single());
        if (!doc)
            throw new common_1.NotFoundException('Documento no encontrado');
        const slashIndex = doc.file_url.indexOf('/');
        const bucket = doc.file_url.substring(0, slashIndex);
        const path = doc.file_url.substring(slashIndex + 1);
        const expiresIn = 3600;
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .createSignedUrl(path, expiresIn);
        if (error || !data)
            throw new Error('No se pudo generar la URL firmada');
        return { signed_url: data.signedUrl, expires_in: expiresIn };
    }
    async remove(patientId, documentId, userId) {
        await this.assertAccess(patientId, userId);
        const { error } = await this.supabase
            .from('documents')
            .delete()
            .eq('id', documentId)
            .eq('patient_id', patientId);
        if (error)
            throw new common_1.NotFoundException('Documento no encontrado');
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map