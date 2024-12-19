// users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Пример: обертка Prisma
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  jwtService: any;
  constructor(private prisma: PrismaService) {}

  async createUser(username: string, email: string, password: string) {
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

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async updateProfile(id: number, profile: any) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    //TODO по хорошему удалять старые изо из бд

    const updatedData: any = {};
    if (profile?.role == 'artist' && user.role == 'user') {
      updatedData.role = profile.role;
    }
    /*
    if (data?.description) {
      updatedData.description = data.description;
    }
    */
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
}
