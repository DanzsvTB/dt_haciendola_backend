import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Post()
  async createTask(@Body() data: User) {
    return await this.userService.createUser(data);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userFound = await this.userService.getUserByID(Number(id));
    if (!userFound) {
      throw new NotFoundException('User not found');
    }
    return userFound;
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    try {
      return await this.userService.deleteUser(Number(id));
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }

  @Put(':id')
  async updateUserById(@Param('id') id: string, @Body() data: User) {
    return await this.userService.updateUser(Number(id), data);
  }
}
