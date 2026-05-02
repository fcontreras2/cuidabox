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
exports.CreateTreatmentDto = exports.CreateTreatmentStepDto = exports.CreateStepMedicationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateStepMedicationDto {
    medication_name;
    dose;
    unit;
    frequency;
    times_of_day;
}
exports.CreateStepMedicationDto = CreateStepMedicationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Amoxicilina' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateStepMedicationDto.prototype, "medication_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 250 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateStepMedicationDto.prototype, "dose", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'mg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateStepMedicationDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Cada 8 horas' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateStepMedicationDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['07:00', '15:00', '23:00'], type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateStepMedicationDto.prototype, "times_of_day", void 0);
class CreateTreatmentStepDto {
    order;
    depends_on_step_id;
    type;
    title;
    description;
    start_offset_days;
    duration_days;
    medication;
}
exports.CreateTreatmentStepDto = CreateTreatmentStepDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Orden del paso dentro del tratamiento',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTreatmentStepDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'uuid-step-anterior',
        description: 'ID del paso del que depende este (opcional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTreatmentStepDto.prototype, "depends_on_step_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['medication', 'action', 'exam'] }),
    (0, class_validator_1.IsEnum)(['medication', 'action', 'exam']),
    __metadata("design:type", String)
], CreateTreatmentStepDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Amoxicilina por 3 días' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateTreatmentStepDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Dar con alimentos para evitar malestar estomacal',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateTreatmentStepDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 0,
        description: 'Días desde el inicio del tratamiento',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTreatmentStepDto.prototype, "start_offset_days", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 3,
        description: 'Duración en días de este paso',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTreatmentStepDto.prototype, "duration_days", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: CreateStepMedicationDto,
        description: 'Requerido si type es medication',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateStepMedicationDto),
    __metadata("design:type", CreateStepMedicationDto)
], CreateTreatmentStepDto.prototype, "medication", void 0);
class CreateTreatmentDto {
    title;
    start_date;
    end_date;
    appointment_id;
    steps;
}
exports.CreateTreatmentDto = CreateTreatmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tratamiento infección respiratoria' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-05-10' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-appointment' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTreatmentDto.prototype, "appointment_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [CreateTreatmentStepDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateTreatmentStepDto),
    __metadata("design:type", Array)
], CreateTreatmentDto.prototype, "steps", void 0);
//# sourceMappingURL=create-treatment.dto.js.map