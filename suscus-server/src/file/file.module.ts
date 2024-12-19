import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FileService } from './file.service';

@Module({
  imports: [AuthModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
