import { Transform } from 'class-transformer';
import { MinLength, IsString, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(6)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
