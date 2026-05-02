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
exports.AllergiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const allergies_service_1 = require("./allergies.service");
const create_allergy_dto_1 = require("./dto/create-allergy.dto");
let AllergiesController = class AllergiesController {
    allergiesService;
    constructor(allergiesService) {
        this.allergiesService = allergiesService;
    }
    create(patientId, dto, req) {
        return this.allergiesService.create(patientId, dto, req.user.id);
    }
    findAll(patientId, req) {
        return this.allergiesService.findAll(patientId, req.user.id);
    }
    remove(patientId, allergyId, req) {
        return this.allergiesService.remove(patientId, allergyId, req.user.id);
    }
};
exports.AllergiesController = AllergiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_allergy_dto_1.CreateAllergyDto, Object]),
    __metadata("design:returntype", void 0)
], AllergiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AllergiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':allergyId'),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Param)('allergyId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AllergiesController.prototype, "remove", null);
exports.AllergiesController = AllergiesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('allergies'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('patients/:patientId/allergies'),
    __metadata("design:paramtypes", [allergies_service_1.AllergiesService])
], AllergiesController);
//# sourceMappingURL=allergies.controller.js.map