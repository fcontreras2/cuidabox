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
exports.DoctorPatientResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PatientSnapshotDto {
    id;
    name;
    birthdate;
    gender;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-patient' }),
    __metadata("design:type", String)
], PatientSnapshotDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mateo Pérez' }),
    __metadata("design:type", String)
], PatientSnapshotDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2022-03-15', nullable: true }),
    __metadata("design:type", Object)
], PatientSnapshotDto.prototype, "birthdate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['male', 'female', 'other'], nullable: true }),
    __metadata("design:type", Object)
], PatientSnapshotDto.prototype, "gender", void 0);
class DoctorPatientResponseDto {
    link_id;
    status;
    access_from;
    created_at;
    patient;
}
exports.DoctorPatientResponseDto = DoctorPatientResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-link' }),
    __metadata("design:type", String)
], DoctorPatientResponseDto.prototype, "link_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['active'] }),
    __metadata("design:type", String)
], DoctorPatientResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01T00:00:00Z' }),
    __metadata("design:type", String)
], DoctorPatientResponseDto.prototype, "access_from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01T00:00:00Z' }),
    __metadata("design:type", String)
], DoctorPatientResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PatientSnapshotDto }),
    __metadata("design:type", PatientSnapshotDto)
], DoctorPatientResponseDto.prototype, "patient", void 0);
//# sourceMappingURL=doctor-patient-response.dto.js.map