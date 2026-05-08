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
exports.CreateVitalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateVitalDto {
    weight_kg;
    height_cm;
    temperature_c;
    heart_rate;
    notes;
    recorded_at;
}
exports.CreateVitalDto = CreateVitalDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 14.5, description: 'Peso en kg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateVitalDto.prototype, "weight_kg", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 92.0, description: 'Talla en cm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateVitalDto.prototype, "height_cm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 37.2, description: 'Temperatura en °C' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 1 }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(45),
    __metadata("design:type", Number)
], CreateVitalDto.prototype, "temperature_c", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 98,
        description: 'Frecuencia cardíaca (bpm)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], CreateVitalDto.prototype, "heart_rate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Tomado en consulta con Dr. García' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateVitalDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-05-01T10:00:00Z',
        description: 'Fecha de registro (por defecto: ahora)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateVitalDto.prototype, "recorded_at", void 0);
//# sourceMappingURL=create-vital.dto.js.map