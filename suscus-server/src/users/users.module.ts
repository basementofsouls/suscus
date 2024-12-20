import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [PrismaModule, AuthModule, FileModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
