"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("../users/users.module");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("./auth.guard");
const auth_controller_1 = require("./auth.controller");
const constants_1 = require("../constants/constants");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret_key,
                signOptions: { expiresIn: constants_1.jwtConstants.expiresIn },
            }),
        ],
        providers: [auth_service_1.AuthService, auth_guard_1.AuthGuard],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, auth_guard_1.AuthGuard, jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map