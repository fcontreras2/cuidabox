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
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_module_1 = require("../supabase/supabase.module");
let DoctorsService = class DoctorsService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async getMyPatients(doctorId) {
        const { data: links } = (await this.supabase
            .from('patient_doctors')
            .select('id, status, access_from, created_at, patient_id')
            .eq('user_id', doctorId)
            .eq('status', 'active')
            .order('created_at', { ascending: false }));
        if (!links?.length)
            return [];
        const result = [];
        for (const link of links) {
            const { data: patient } = (await this.supabase
                .from('patients')
                .select('id, name, birthdate, gender')
                .eq('id', link.patient_id)
                .single());
            if (patient) {
                result.push({
                    link_id: link.id,
                    status: link.status,
                    access_from: link.access_from,
                    created_at: link.created_at,
                    patient,
                });
            }
        }
        return result;
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_module_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map