import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUserByID(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: number, data: User): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
