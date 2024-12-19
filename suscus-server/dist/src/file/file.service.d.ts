import { ConfigService } from '@nestjs/config';
export declare class FileService {
    private configService;
    private supabaseClient;
    constructor(configService: ConfigService);
    private initializeClient;
    uploadFile(file: Express.Multer.File): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
}
