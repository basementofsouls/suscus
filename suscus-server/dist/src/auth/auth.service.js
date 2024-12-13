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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const constants_1 = require("../constants/constants");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { ...result } = user;
            return result;
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async login(email, pass) {
        const user = await this.usersService.findByEmail(email);
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException();
        }
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };
        const access_token = await this.jwtService.signAsync(payload, {
            secret: constants_1.jwtConstants.secret,
            expiresIn: constants_1.jwtConstants.expiresIn,
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: constants_1.jwtConstants.refreshSecret,
            expiresIn: constants_1.jwtConstants.expiresInRefrash,
        });
        return {
            user,
            access_token,
            refresh_token,
        };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: constants_1.jwtConstants.refreshSecret,
            });
            const user = await this.usersService.findById(payload.id);
            const newPayload = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            };
            const newAccessToken = await this.jwtService.signAsync(newPayload, {
                secret: constants_1.jwtConstants.secret,
                expiresIn: '15m',
            });
            return {
                access_token: newAccessToken,
                user: { ...newPayload, avatar: user.avatar },
            };
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map