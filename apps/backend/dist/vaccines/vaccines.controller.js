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
exports.VaccinesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const vaccines_service_1 = require("./vaccines.service");
const create_vaccine_dto_1 = require("./dto/create-vaccine.dto");
let VaccinesController = class VaccinesController {
    vaccinesService;
    constructor(vaccinesService) {
        this.vaccinesService = vaccinesService;
    }
    create(patientId, dto, req) {
        return this.vaccinesService.create(patientId, dto, req.user.id);
    }
    findAll(patientId, req) {
        return this.vaccinesService.findAll(patientId, req.user.id);
    }
    remove(patientId, vaccineId, req) {
        return this.vaccinesService.remove(patientId, vaccineId, req.user.id);
    }
};
exports.VaccinesController = VaccinesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_vaccine_dto_1.CreateVaccineDto, Object]),
    __metadata("design:returntype", void 0)
], VaccinesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], VaccinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':vaccineId'),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('vaccineId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], VaccinesController.prototype, "remove", null);
exports.VaccinesController = VaccinesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('vaccines'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('patients/:patientId/vaccines'),
    __metadata("design:paramtypes", [vaccines_service_1.VaccinesService])
], VaccinesController);
//# sourceMappingURL=vaccines.controller.js.map