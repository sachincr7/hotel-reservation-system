import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRoomTypeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  max_occupancy?: number;

  @IsOptional()
  @IsString()
  amenities?: string;
}
