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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const treatments_service_1 = require("./treatments.service");
const create_treatment_dto_1 = require("./dto/create-treatment.dto");
const update_treatment_status_dto_1 = require("./dto/update-treatment-status.dto");
const treatment_response_dto_1 = require("./dto/treatment-response.dto");
let TreatmentsController = class TreatmentsController {
    treatmentsService;
    constructor(treatmentsService) {
        this.treatmentsService = treatmentsService;
    }
    create(patientId, dto, req) {
        return this.treatmentsService.create(patientId, dto, req.user.id);
    }
    findAll(patientId, req) {
        return this.treatmentsService.findAll(patientId, req.user.id);
    }
    findOne(patientId, treatmentId, req) {
        return this.treatmentsService.findOne(patientId, treatmentId, req.user.id);
    }
    updateStatus(patientId, treatmentId, dto, req) {
        return this.treatmentsService.updateStatus(patientId, treatmentId, dto.status, req.user.id);
    }
};
exports.TreatmentsController = TreatmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear tratamiento con sus pasos y medicamentos',
        description: 'Crea el tratamiento y sus pasos en una sola llamada. Los pasos de tipo "medication" deben incluir el campo "medication" con los detalles.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, type: treatment_response_dto_1.TreatmentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_treatment_dto_1.CreateTreatmentDto, Object]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar tratamientos del paciente con sus pasos' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [treatment_response_dto_1.TreatmentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':treatmentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener detalle de un tratamiento con sus pasos' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: treatment_response_dto_1.TreatmentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tratamiento no encontrado' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('treatmentId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':treatmentId/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar estado del tratamiento',
        description: 'Permite marcar un tratamiento como active, completed o cancelled.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: treatment_response_dto_1.TreatmentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tratamiento no encontrado' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('treatmentId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_treatment_status_dto_1.UpdateTreatmentStatusDto, Object]),
    __metadata("design:returntype", void 0)
], TreatmentsController.prototype, "updateStatus", null);
exports.TreatmentsController = TreatmentsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('treatments'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('patients/:patientId/treatments'),
    __metadata("design:paramtypes", [treatments_service_1.TreatmentsService])
], TreatmentsController);
//# sourceMappingURL=treatments.controller.js.map