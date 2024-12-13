import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [AuthModule, UsersModule, PublicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
