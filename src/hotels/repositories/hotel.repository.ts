import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel.entity';
import { Repository } from 'typeorm';

import { CreateHotelDto } from '../dto/create-hotel.dto';

@Injectable()
export class HotelRepository {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  create(createHotelDto: CreateHotelDto) {
    const hotel = this.hotelRepository.create(createHotelDto);
    return this.hotelRepository.save(hotel);
  }
}
