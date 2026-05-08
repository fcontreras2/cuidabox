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
exports.VitalResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class VitalResponseDto {
    id;
    patient_id;
    recorded_by;
    weight_kg;
    height_cm;
    temperature_c;
    heart_rate;
    notes;
    recorded_at;
}
exports.VitalResponseDto = VitalResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], VitalResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-456' }),
    __metadata("design:type", String)
], VitalResponseDto.prototype, "patient_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-789' }),
    __metadata("design:type", String)
], VitalResponseDto.prototype, "recorded_by", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 14.5 }),
    __metadata("design:type", Object)
], VitalResponseDto.prototype, "weight_kg", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 92.0 }),
    __metadata("design:type", Object)
], VitalResponseDto.prototype, "height_cm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 37.2 }),
    __metadata("design:type", Object)
], VitalResponseDto.prototype, "temperature_c", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 98 }),
    __metadata("design:type", Object)
], VitalResponseDto.prototype, "heart_rate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Tomado en consulta con Dr. García' }),
    __metadata("design:type", Object)
], VitalResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01T10:00:00Z' }),
    __metadata("design:type", String)
], VitalResponseDto.prototype, "recorded_at", void 0);
//# sourceMappingURL=vital-response.dto.js.map