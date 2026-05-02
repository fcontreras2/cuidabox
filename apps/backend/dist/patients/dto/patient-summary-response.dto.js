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
exports.PatientSummaryResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const patient_response_dto_1 = require("./patient-response.dto");
class AppointmentSnapshotDto {
    id;
    title;
    scheduled_at;
    doctor_name;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], AppointmentSnapshotDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Control mensual' }),
    __metadata("design:type", String)
], AppointmentSnapshotDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-15T10:00:00Z' }),
    __metadata("design:type", String)
], AppointmentSnapshotDto.prototype, "scheduled_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Dr. García' }),
    __metadata("design:type", Object)
], AppointmentSnapshotDto.prototype, "doctor_name", void 0);
class VitalSnapshotDto {
    id;
    type;
    value;
    recorded_at;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], VitalSnapshotDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'weight' }),
    __metadata("design:type", String)
], VitalSnapshotDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12.5 kg' }),
    __metadata("design:type", String)
], VitalSnapshotDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-04-28T08:00:00Z' }),
    __metadata("design:type", String)
], VitalSnapshotDto.prototype, "recorded_at", void 0);
class PatientSummaryResponseDto {
    patient;
    last_appointment;
    next_appointment;
    last_vital;
    active_allergies_count;
    active_treatments_count;
}
exports.PatientSummaryResponseDto = PatientSummaryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: patient_response_dto_1.PatientResponseDto }),
    __metadata("design:type", patient_response_dto_1.PatientResponseDto)
], PatientSummaryResponseDto.prototype, "patient", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: AppointmentSnapshotDto, nullable: true }),
    __metadata("design:type", Object)
], PatientSummaryResponseDto.prototype, "last_appointment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: AppointmentSnapshotDto, nullable: true }),
    __metadata("design:type", Object)
], PatientSummaryResponseDto.prototype, "next_appointment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: VitalSnapshotDto, nullable: true }),
    __metadata("design:type", Object)
], PatientSummaryResponseDto.prototype, "last_vital", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Total de alergias registradas' }),
    __metadata("design:type", Number)
], PatientSummaryResponseDto.prototype, "active_allergies_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Tratamientos con status active' }),
    __metadata("design:type", Number)
], PatientSummaryResponseDto.prototype, "active_treatments_count", void 0);
//# sourceMappingURL=patient-summary-response.dto.js.map