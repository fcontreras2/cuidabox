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
exports.PatientDoctorResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DoctorInfoDto {
    id;
    name;
    email;
    specialty_key;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-doctor' }),
    __metadata("design:type", String)
], DoctorInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dr. García' }),
    __metadata("design:type", String)
], DoctorInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'doctor@example.com' }),
    __metadata("design:type", String)
], DoctorInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'pediatrics',
        description: 'Key de especialidad, traducido en frontend',
    }),
    __metadata("design:type", Object)
], DoctorInfoDto.prototype, "specialty_key", void 0);
class PatientDoctorResponseDto {
    id;
    patient_id;
    status;
    invited_by;
    access_from;
    created_at;
    doctor;
}
exports.PatientDoctorResponseDto = PatientDoctorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], PatientDoctorResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-patient' }),
    __metadata("design:type", String)
], PatientDoctorResponseDto.prototype, "patient_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['pending', 'active', 'rejected'] }),
    __metadata("design:type", String)
], PatientDoctorResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'uuid-holder',
        description: 'Quien realizó el enlace',
    }),
    __metadata("design:type", String)
], PatientDoctorResponseDto.prototype, "invited_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01T00:00:00Z' }),
    __metadata("design:type", String)
], PatientDoctorResponseDto.prototype, "access_from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01T00:00:00Z' }),
    __metadata("design:type", String)
], PatientDoctorResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: DoctorInfoDto }),
    __metadata("design:type", DoctorInfoDto)
], PatientDoctorResponseDto.prototype, "doctor", void 0);
//# sourceMappingURL=patient-doctor-response.dto.js.map