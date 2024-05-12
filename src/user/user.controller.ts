import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @Post()
  async createTask(@Body() data: User) {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserByID(Number(id));
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }

  @Put(':id')
  async updateUserById(@Param('id') id: string, @Body() data: User) {
    return this.userService.updateUser(Number(id), data);
  }
}
