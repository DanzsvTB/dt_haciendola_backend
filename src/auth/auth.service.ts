import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ password, email, username }: RegisterDto) {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (user) {
        throw new BadRequestException('User already exists');
      }
      const hashedPassword = await bcryptjs.hash(password, 10);
      const newUser = await this.userService.createUser({
        username,
        email,
        password: hashedPassword,
      });

      const payload = { email: newUser.email };
      const token = await this.jwtService.signAsync(payload);

      return {
        token: token,
        user: newUser,
      };
    } catch (error) {
      //   console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { email: user.email };

    const token = await this.jwtService.signAsync(payload);
    return {
      token: token,
      user: user,
    };
  }
}
