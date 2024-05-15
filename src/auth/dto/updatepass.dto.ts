import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpDatePasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  oldPassword: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  newPassword: string;
}
