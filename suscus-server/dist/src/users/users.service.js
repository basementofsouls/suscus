"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.users.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role: 'user',
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.users.findUnique({ where: { email } });
    }
    async findById(id) {
        return this.prisma.users.findUnique({ where: { id } });
    }
    async updateProfile(id, profile) {
        const user = await this.prisma.users.findUnique({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        const updatedData = {};
        if (profile?.role == 'artist' && user.role == 'user') {
            updatedData.role = profile.role;
        }
        if (profile?.avatar) {
            updatedData.avatar = profile.avatar;
        }
        if (profile?.username) {
            updatedData.username = profile.username;
        }
        if (profile?.password) {
            const hashedPassword = await bcrypt.hash(profile.password, 10);
            updatedData.password = hashedPassword;
        }
        return await this.prisma.users.update({
            where: { id },
            data: updatedData,
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map