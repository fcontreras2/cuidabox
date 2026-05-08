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
exports.TreatmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class StepMedicationResponseDto {
    id;
    medication_name;
    dose;
    unit;
    frequency;
    times_of_day;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], StepMedicationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Amoxicilina' }),
    __metadata("design:type", String)
], StepMedicationResponseDto.prototype, "medication_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 250 }),
    __metadata("design:type", Object)
], StepMedicationResponseDto.prototype, "dose", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'mg' }),
    __metadata("design:type", Object)
], StepMedicationResponseDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Cada 8 horas' }),
    __metadata("design:type", Object)
], StepMedicationResponseDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['07:00', '15:00', '23:00'], type: [String] }),
    __metadata("design:type", Object)
], StepMedicationResponseDto.prototype, "times_of_day", void 0);
class TreatmentStepResponseDto {
    id;
    order;
    depends_on_step_id;
    type;
    title;
    description;
    start_offset_days;
    duration_days;
    medication;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], TreatmentStepResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TreatmentStepResponseDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-step-anterior' }),
    __metadata("design:type", Object)
], TreatmentStepResponseDto.prototype, "depends_on_step_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['medication', 'action', 'exam'] }),
    __metadata("design:type", String)
], TreatmentStepResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Amoxicilina por 3 días' }),
    __metadata("design:type", String)
], TreatmentStepResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Dar con alimentos' }),
    __metadata("design:type", Object)
], TreatmentStepResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], TreatmentStepResponseDto.prototype, "start_offset_days", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3 }),
    __metadata("design:type", Object)
], TreatmentStepResponseDto.prototype, "duration_days", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: StepMedicationResponseDto }),
    __metadata("design:type", Object)
], TreatmentStepResponseDto.prototype, "medication", void 0);
class TreatmentResponseDto {
    id;
    patient_id;
    doctor_id;
    appointment_id;
    title;
    start_date;
    end_date;
    status;
    created_by;
    created_at;
    steps;
}
exports.TreatmentResponseDto = TreatmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], TreatmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-456' }),
    __metadata("design:type", String)
], TreatmentResponseDto.prototype, "patient_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-789' }),
    __metadata("design:type", Object)
], TreatmentResponseDto.prototype, "doctor_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-apt' }),
    __metadata("design:type", Object)
], TreatmentResponseDto.prototype, "appointment_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tratamiento infección respiratoria' }),
    __metadata("design:type", String)
], TreatmentResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-01' }),
    __metadata("design:type", Object)
], TreatmentResponseDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-10' }),
    __metadata("design:type", Object)
], TreatmentResponseDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['active', 'completed', 'cancelled'] }),
    __metadata("design:type", String)
], TreatmentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-holder' }),
    __metadata("design:type", String)
], TreatmentResponseDto.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01T00:00:00Z' }),
    __metadata("design:type", String)
], TreatmentResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [TreatmentStepResponseDto] }),
    __metadata("design:type", Array)
], TreatmentResponseDto.prototype, "steps", void 0);
//# sourceMappingURL=treatment-response.dto.js.map