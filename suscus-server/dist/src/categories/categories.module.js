"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.СategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const prisma_module_1 = require("../../prisma/prisma.module");
const categories_controller_1 = require("./categories.controller");
const categories_service_1 = require("./categories.service");
let СategoriesModule = class СategoriesModule {
};
exports.СategoriesModule = СategoriesModule;
exports.СategoriesModule = СategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, prisma_module_1.PrismaModule],
        controllers: [categories_controller_1.СategoriesController],
        providers: [categories_service_1.СategoriesService],
    })
], СategoriesModule);
//# sourceMappingURL=categories.module.js.map