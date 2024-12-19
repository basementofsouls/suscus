import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [AuthModule, PrismaModule, FileModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
