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
exports.AppointmentsController = exports.AppointmentsUpcomingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const appointments_service_1 = require("./appointments.service");
const create_appointment_dto_1 = require("./dto/create-appointment.dto");
const update_appointment_status_dto_1 = require("./dto/update-appointment-status.dto");
const appointment_response_dto_1 = require("./dto/appointment-response.dto");
let AppointmentsUpcomingController = class AppointmentsUpcomingController {
    appointmentsService;
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    findUpcoming(req, limit) {
        return this.appointmentsService.findUpcoming(req.user.id, limit ? parseInt(limit, 10) : 10);
    }
};
exports.AppointmentsUpcomingController = AppointmentsUpcomingController;
__decorate([
    (0, common_1.Get)('upcoming'),
    (0, swagger_1.ApiOperation)({
        summary: 'Próximas citas del usuario autenticado',
        description: 'Retorna las próximas citas (status scheduled, fecha futura) de todos los pacientes del holder. Útil para el home del dashboard.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        example: 10,
        description: 'Máximo de citas a retornar (default 10)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [appointment_response_dto_1.AppointmentResponseDto] }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppointmentsUpcomingController.prototype, "findUpcoming", null);
exports.AppointmentsUpcomingController = AppointmentsUpcomingController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('appointments'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsUpcomingController);
let AppointmentsController = class AppointmentsController {
    appointmentsService;
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    create(patientId, dto, req) {
        return this.appointmentsService.create(patientId, dto, req.user.id);
    }
    findAll(patientId, req) {
        return this.appointmentsService.findAll(patientId, req.user.id);
    }
    findOne(patientId, appointmentId, req) {
        return this.appointmentsService.findOne(patientId, appointmentId, req.user.id);
    }
    updateStatus(patientId, appointmentId, dto, req) {
        return this.appointmentsService.updateStatus(patientId, appointmentId, dto.status, req.user.id);
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Agendar una cita',
        description: 'Puede ser agendada por el holder, doctor o admin. El doctor_id es opcional si el doctor aún no está en el sistema.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, type: appointment_response_dto_1.AppointmentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_appointment_dto_1.CreateAppointmentDto, Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar citas del paciente ordenadas por fecha',
        description: 'Retorna todas las citas (scheduled, completed y cancelled) en orden descendente.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [appointment_response_dto_1.AppointmentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':appointmentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener detalle de una cita' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: appointment_response_dto_1.AppointmentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cita no encontrada' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('appointmentId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':appointmentId/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar estado de la cita',
        description: 'Permite marcar la cita como scheduled, completed o cancelled.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: appointment_response_dto_1.AppointmentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sin acceso a este paciente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cita no encontrada' }),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('appointmentId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_appointment_status_dto_1.UpdateAppointmentStatusDto, Object]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "updateStatus", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('appointments'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('patients/:patientId/appointments'),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map