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
exports.VaccineResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class VaccineResponseDto {
    id;
    patient_id;
    name;
    dose_number;
    administered_at;
    administered_by;
    notes;
    created_at;
}
exports.VaccineResponseDto = VaccineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], VaccineResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-456' }),
    __metadata("design:type", String)
], VaccineResponseDto.prototype, "patient_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hepatitis B' }),
    __metadata("design:type", String)
], VaccineResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Object)
], VaccineResponseDto.prototype, "dose_number", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-06-15T10:00:00Z' }),
    __metadata("design:type", Object)
], VaccineResponseDto.prototype, "administered_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Dr. García / Centro de Salud Norte' }),
    __metadata("design:type", Object)
], VaccineResponseDto.prototype, "administered_by", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Sin reacciones adversas' }),
    __metadata("design:type", Object)
], VaccineResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01T00:00:00Z' }),
    __metadata("design:type", String)
], VaccineResponseDto.prototype, "created_at", void 0);
//# sourceMappingURL=vaccine-response.dto.js.map