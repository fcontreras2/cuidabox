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
exports.PatientDoctorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const patient_doctors_service_1 = require("./patient-doctors.service");
const link_doctor_dto_1 = require("./dto/link-doctor.dto");
const update_link_status_dto_1 = require("./dto/update-link-status.dto");
const patient_doctor_response_dto_1 = require("./dto/patient-doctor-response.dto");
let PatientDoctorsController = class PatientDoctorsController {
    patientDoctorsService;
    constructor(patientDoctorsService) {
        this.patientDoctorsService = patientDoctorsService;
    }
    linkDoctor(patientId, dto, req) {
        return this.patientDoctorsService.linkDoctor(patientId, dto.email, req.user.id);
    }
    findAll(patientId, req) {
        return this.patientDoctorsService.findAll(patientId, req.user.id);
    }
    updateStatus(patientId, linkId, dto, req) {
        return this.patientDoctorsService.updateStatus(patientId, linkId, dto.status, req.user.id);
    }
    remove(patientId, linkId, req) {
        return this.patientDoctorsService.remove(patientId, linkId, req.user.id);
    }
};
exports.PatientDoctorsController = PatientDoctorsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Enlazar doctor al paciente',
        description: 'El holder ingresa el email del doctor. Si existe en Cuidabox se crea el enlace en estado pending. El doctor deberá aceptarlo.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, type: patient_doctor_response_dto_1.PatientDoctorResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor no encontrado en Cuidabox' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Doctor ya enlazado' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, link_doctor_dto_1.LinkDoctorDto, Object]),
    __metadata("design:returntype", void 0)
], PatientDoctorsController.prototype, "linkDoctor", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar doctores enlazados al paciente',
        description: 'Retorna todos los enlaces (pending, active, rejected) con info del doctor.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [patient_doctor_response_dto_1.PatientDoctorResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PatientDoctorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':linkId/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Aceptar o rechazar enlace (solo el doctor)',
        description: 'El doctor autenticado puede aceptar (active) o rechazar (rejected) el enlace solicitado por el holder.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: patient_doctor_response_dto_1.PatientDoctorResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'El enlace ya fue procesado' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Solo el doctor puede responder el enlace',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Enlace no encontrado' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('linkId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_link_status_dto_1.UpdateLinkStatusDto, Object]),
    __metadata("design:returntype", void 0)
], PatientDoctorsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':linkId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar enlace con el doctor',
        description: 'El holder puede revocar el acceso de un doctor en cualquier momento.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Enlace eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Enlace no encontrado' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('linkId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PatientDoctorsController.prototype, "remove", null);
exports.PatientDoctorsController = PatientDoctorsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('patient-doctors'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('patients/:patientId/doctors'),
    __metadata("design:paramtypes", [patient_doctors_service_1.PatientDoctorsService])
], PatientDoctorsController);
//# sourceMappingURL=patient-doctors.controller.js.map