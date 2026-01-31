import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
