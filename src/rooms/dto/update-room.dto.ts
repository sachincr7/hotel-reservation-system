import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsNumber()
  floor?: number;

  @IsOptional()
  @IsNumber()
  number?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  room_type_id?: number;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}
