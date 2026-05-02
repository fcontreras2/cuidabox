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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const documents_service_1 = require("./documents.service");
const create_document_dto_1 = require("./dto/create-document.dto");
const document_response_dto_1 = require("./dto/document-response.dto");
let DocumentsController = class DocumentsController {
    documentsService;
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    create(patientId, dto, req) {
        return this.documentsService.create(patientId, dto, req.user.id);
    }
    findAll(patientId, req, treatment_id, appointment_id, exam_id) {
        return this.documentsService.findAll(patientId, req.user.id, {
            treatment_id,
            appointment_id,
            exam_id,
        });
    }
    getSignedUrl(patientId, documentId, req) {
        return this.documentsService.getSignedUrl(patientId, documentId, req.user.id);
    }
    remove(patientId, documentId, req) {
        return this.documentsService.remove(patientId, documentId, req.user.id);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Subir documento al historial del paciente',
        description: 'Registra la URL de un archivo ya subido a Supabase Storage. Puede estar ligado a un tratamiento, cita o examen.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, type: document_response_dto_1.DocumentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_document_dto_1.CreateDocumentDto, Object]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar documentos del paciente',
        description: 'Retorna todos los documentos. Filtra opcionalmente por treatment_id, appointment_id o exam_id.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'treatment_id', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'appointment_id', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'exam_id', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [document_response_dto_1.DocumentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('treatment_id')),
    __param(3, (0, common_1.Query)('appointment_id')),
    __param(4, (0, common_1.Query)('exam_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String, String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':documentId/signed-url'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener URL firmada para descargar/previsualizar un documento',
        description: 'Genera una URL temporal de Supabase Storage (expira en 1 hora). El file_url debe tener formato "bucket/path/file.pdf".',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        schema: {
            properties: {
                signed_url: { type: 'string', example: 'https://...' },
                expires_in: { type: 'number', example: 3600 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Documento no encontrado' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('documentId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "getSignedUrl", null);
__decorate([
    (0, common_1.Delete)(':documentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar documento del paciente' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Documento eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Documento no encontrado' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('documentId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "remove", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('documents'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('patients/:patientId/documents'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map