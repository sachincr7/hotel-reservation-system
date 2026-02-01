import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel.entity';
import { Repository } from 'typeorm';

import { CreateHotelDto } from '../dto/create-hotel.dto';
import { UpdateHotelDto } from '../dto/update-hotel.dto';

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

  findAll() {
    return this.hotelRepository.find();
  }

  findOne(id: number) {
    return this.hotelRepository.findOne({ where: { id } });
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    const hotel = await this.findOne(id);
    if (!hotel) return null;
    Object.assign(hotel, updateHotelDto);
    return this.hotelRepository.save(hotel);
  }

  async remove(id: number) {
    const hotel = await this.findOne(id);
    if (!hotel) return null;
    await this.hotelRepository.remove(hotel);
    return hotel;
  }
}
