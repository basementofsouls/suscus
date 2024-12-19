import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { СategoriesController } from './categories.controller';
import { СategoriesService } from './categories.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [СategoriesController],
  providers: [СategoriesService],
})
export class СategoriesModule {}
