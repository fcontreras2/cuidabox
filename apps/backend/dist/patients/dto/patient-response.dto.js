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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PatientResponseDto {
    id;
    name;
    birthdate;
    gender;
    blood_type;
    notes;
    insurance_provider;
    insurance_policy_number;
    created_by;
    created_at;
}
exports.PatientResponseDto = PatientResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], PatientResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mateo Pérez' }),
    __metadata("design:type", String)
], PatientResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2022-03-15' }),
    __metadata("design:type", Object)
], PatientResponseDto.prototype, "birthdate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['male', 'female', 'other'] }),
    __metadata("design:type", Object)
], PatientResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'O+' }),
    __metadata("design:type", Object)
], PatientResponseDto.prototype, "blood_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Paciente con asma leve' }),
    __metadata("design:type", Object)
], PatientResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Seguros Caracas' }),
    __metadata("design:type", Object)
], PatientResponseDto.prototype, "insurance_provider", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'SC-123456' }),
    __metadata("design:type", Object)
], PatientResponseDto.prototype, "insurance_policy_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-456' }),
    __metadata("design:type", String)
], PatientResponseDto.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01T00:00:00Z' }),
    __metadata("design:type", String)
], PatientResponseDto.prototype, "created_at", void 0);
//# sourceMappingURL=patient-response.dto.js.map