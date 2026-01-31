import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  floor: number;

  @IsNumber()
  number: number;

  @IsString()
  name: string;

  @IsNumber()
  room_type_id: number;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}
