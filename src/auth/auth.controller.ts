import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpDatePasswordDto } from './dto/updatepass.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return await this.authService.register(registerDto);
  }
  @Post('login')
  async login(
    @Body()
    loginDto: LoginDto,
  ) {
    return await this.authService.login(loginDto);
  }

  @Put('update')
  async updatePassword(
    @Body()
    updatePasswordDto: UpDatePasswordDto,
  ) {
    return await this.authService.updatePassword(updatePasswordDto);
  }
}
