import { IsDateString, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  hotel_id: number;

  @IsNumber()
  room_type_id: number;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;
}
