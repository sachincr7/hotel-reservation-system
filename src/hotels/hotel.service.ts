import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelRepository } from './repositories/hotel.repository';

@Injectable()
export class HotelService {
  constructor(private readonly hotelRepository: HotelRepository) {}

  create(createHotelDto: CreateHotelDto) {
    return this.hotelRepository.create(createHotelDto);
  }

  async findOne(id: number) {
    const hotel = await this.hotelRepository.findOne(id);
    if (!hotel) throw new NotFoundException('hotel not found');
    return hotel;
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    const hotel = await this.hotelRepository.update(id, updateHotelDto);
    if (!hotel) throw new NotFoundException('hotel not found');
    return hotel;
  }

  async remove(id: number) {
    const hotel = await this.hotelRepository.remove(id);
    if (!hotel) throw new NotFoundException('hotel not found');
    return hotel;
  }
}
