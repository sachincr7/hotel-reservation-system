import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignupDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
