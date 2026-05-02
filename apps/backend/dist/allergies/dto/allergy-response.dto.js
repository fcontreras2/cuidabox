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
exports.AllergyResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AllergyResponseDto {
    id;
    patient_id;
    name;
    type;
    severity;
    notes;
    created_at;
}
exports.AllergyResponseDto = AllergyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], AllergyResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-456' }),
    __metadata("design:type", String)
], AllergyResponseDto.prototype, "patient_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Penicilina' }),
    __metadata("design:type", String)
], AllergyResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['drug', 'food', 'environmental', 'other'] }),
    __metadata("design:type", Object)
], AllergyResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['mild', 'moderate', 'severe'] }),
    __metadata("design:type", Object)
], AllergyResponseDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Produce urticaria generalizada' }),
    __metadata("design:type", Object)
], AllergyResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01T00:00:00Z' }),
    __metadata("design:type", String)
], AllergyResponseDto.prototype, "created_at", void 0);
//# sourceMappingURL=allergy-response.dto.js.map