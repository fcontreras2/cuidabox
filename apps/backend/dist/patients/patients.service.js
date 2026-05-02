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
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], PatientsService);
//# sourceMappingURL=patients.service.js.map