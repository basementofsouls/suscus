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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
let FileService = class FileService {
    constructor(configService) {
        this.configService = configService;
        this.initializeClient();
    }
    initializeClient() {
        const supabaseUrl = this.configService.get('SUPABASE_URL');
        const supabaseKey = this.configService.get('SUPABASE_KEY');
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase credentials are missing');
        }
        this.supabaseClient = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
    }
    async uploadFile(file) {
        try {
            const bucketName = 'images';
            const filePath = `${Date.now()}_${file.originalname}`;
            const { error } = await this.supabaseClient.storage
                .from(bucketName)
                .upload(filePath, file.buffer, {
                contentType: file.mimetype,
            });
            if (error) {
                throw new Error(`Failed to upload file: ${error.message}`);
            }
            const data = this.supabaseClient.storage
                .from(bucketName)
                .getPublicUrl(filePath);
            if (!data || !data.data.publicUrl) {
                throw new Error('Failed to generate public URL');
            }
            return data.data.publicUrl;
        }
        catch (e) {
            console.error('Error uploading file:', e.message);
            return null;
        }
    }
    async deleteFile(filePath) {
        try {
            const bucketName = 'images';
            const { error } = await this.supabaseClient.storage
                .from(bucketName)
                .remove([filePath]);
            if (error) {
                throw new Error(`Failed to delete file: ${error.message}`);
            }
            console.log(`File ${filePath} deleted successfully`);
        }
        catch (e) {
            console.error('Error deleting file:', e.message);
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileService);
//# sourceMappingURL=file.service.js.map