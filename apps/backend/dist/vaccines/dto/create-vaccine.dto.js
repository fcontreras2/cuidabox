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
exports.CreateVaccineDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateVaccineDto {
    name;
    dose_number;
    administered_at;
    administered_by;
    notes;
}
exports.CreateVaccineDto = CreateVaccineDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hepatitis B' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateVaccineDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Número de dosis (1, 2, 3...)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateVaccineDto.prototype, "dose_number", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2024-06-15T10:00:00Z',
        description: 'Fecha de administración',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateVaccineDto.prototype, "administered_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Dr. García / Centro de Salud Norte' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateVaccineDto.prototype, "administered_by", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Sin reacciones adversas' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateVaccineDto.prototype, "notes", void 0);
//# sourceMappingURL=create-vaccine.dto.js.map