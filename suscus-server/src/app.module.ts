import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PublicationsModule } from './publications/publications.module';
import { OrdersModule } from './orders/orders.module';
import { CommentsModule } from './comments/comments.module';
import { СategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './Chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Делает доступ к ConfigService глобальным
    }),
    AuthModule,
    UsersModule,
    PublicationsModule,
    OrdersModule,
    CommentsModule,
    СategoriesModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
