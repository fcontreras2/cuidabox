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
exports.TimelineEventResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TimelineEventResponseDto {
    id;
    type;
    occurred_at;
    payload;
    created_by;
}
exports.TimelineEventResponseDto = TimelineEventResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123' }),
    __metadata("design:type", String)
], TimelineEventResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [
            'vaccine',
            'vital',
            'medication_given',
            'symptom',
            'visit',
            'exam',
            'note',
        ],
        example: 'vaccine',
    }),
    __metadata("design:type", String)
], TimelineEventResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01T10:00:00Z' }),
    __metadata("design:type", String)
], TimelineEventResponseDto.prototype, "occurred_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { name: 'Hepatitis B', dose_number: 1 },
        description: 'Datos del evento según su tipo',
    }),
    __metadata("design:type", Object)
], TimelineEventResponseDto.prototype, "payload", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-456' }),
    __metadata("design:type", Object)
], TimelineEventResponseDto.prototype, "created_by", void 0);
//# sourceMappingURL=event-response.dto.js.map