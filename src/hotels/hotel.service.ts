import { Injectable } from '@nestjs/common';

import { CreateHotelDto } from './dto/create-hotel.dto';
import { HotelRepository } from './repositories/hotel.repository';

@Injectable()
export class HotelService {
  constructor(private readonly hotelRepository: HotelRepository) {}

  create(createHotelDto: CreateHotelDto) {
    return this.hotelRepository.create(createHotelDto);
  }
}
