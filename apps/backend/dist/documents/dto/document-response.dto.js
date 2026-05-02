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
exports.DocumentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DocumentResponseDto {
    id;
    patient_id;
    uploaded_by;
    treatment_id;
    appointment_id;
    exam_id;
    name;
    file_url;
    type;
    uploaded_at;
}
exports.DocumentResponseDto = DocumentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-patient' }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "patient_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-holder' }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "uploaded_by", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-treatment' }),
    __metadata("design:type", Object)
], DocumentResponseDto.prototype, "treatment_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-appointment' }),
    __metadata("design:type", Object)
], DocumentResponseDto.prototype, "appointment_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-exam' }),
    __metadata("design:type", Object)
], DocumentResponseDto.prototype, "exam_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Receta amoxicilina.pdf' }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storage.supabase.co/...' }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "file_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['lab', 'imaging', 'prescription', 'other'] }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01T00:00:00Z' }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "uploaded_at", void 0);
//# sourceMappingURL=document-response.dto.js.map