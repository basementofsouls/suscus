import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class FileService {
  private supabaseClient: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.initializeClient();
  }

  private initializeClient() {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials are missing');
    }

    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const bucketName = 'images'; // имя бакета в Supabase
      const filePath = `${Date.now()}_${file.originalname}`; // Генерируем уникальный путь

      // Загружаем файл в Supabase
      const { error } = await this.supabaseClient.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        throw new Error(`Failed to upload file: ${error.message}`);
      }

      // Получаем публичную ссылку на файл
      const data = this.supabaseClient.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      if (!data || !data.data.publicUrl) {
        throw new Error('Failed to generate public URL');
      }

      return data.data.publicUrl; // Возвращаем публичную ссылку
    } catch (e: any) {
      console.error('Error uploading file:', e.message);
      return null;
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const bucketName = 'images';
      const { error } = await this.supabaseClient.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        throw new Error(`Failed to delete file: ${error.message}`);
      }

      console.log(`File ${filePath} deleted successfully`);
    } catch (e: any) {
      console.error('Error deleting file:', e.message);
    }
  }
}
