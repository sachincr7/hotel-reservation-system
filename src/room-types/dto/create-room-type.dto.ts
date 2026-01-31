import { IsNumber, IsString } from 'class-validator';

export class CreateRoomTypeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  max_occupancy: number;

  @IsString()
  amenities: string;
}
