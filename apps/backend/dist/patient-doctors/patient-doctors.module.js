"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientDoctorsModule = void 0;
const common_1 = require("@nestjs/common");
const patient_doctors_controller_1 = require("./patient-doctors.controller");
const patient_doctors_service_1 = require("./patient-doctors.service");
let PatientDoctorsModule = class PatientDoctorsModule {
};
exports.PatientDoctorsModule = PatientDoctorsModule;
exports.PatientDoctorsModule = PatientDoctorsModule = __decorate([
    (0, common_1.Module)({
        controllers: [patient_doctors_controller_1.PatientDoctorsController],
        providers: [patient_doctors_service_1.PatientDoctorsService],
    })
], PatientDoctorsModule);
//# sourceMappingURL=patient-doctors.module.js.map