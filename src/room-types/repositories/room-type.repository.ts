import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from 'src/entities/room_type.entity';
import { Repository } from 'typeorm';

import { CreateRoomTypeDto } from '../dto/create-room-type.dto';
import { UpdateRoomTypeDto } from '../dto/update-room-type.dto';

@Injectable()
export class RoomTypeRepository {
  constructor(
    @InjectRepository(RoomType)
    private readonly roomTypeRepository: Repository<RoomType>,
  ) {}

  create(hotelId: number, createRoomTypeDto: CreateRoomTypeDto) {
    const roomType = this.roomTypeRepository.create({
      ...createRoomTypeDto,
      hotel_id: hotelId,
    });

    return this.roomTypeRepository.save(roomType);
  }

  findAll(hotelId: number) {
    return this.roomTypeRepository.find({ where: { hotel_id: hotelId } });
  }

  findOne(hotelId: number, roomTypeId: number) {
    return this.roomTypeRepository.findOne({
      where: { id: roomTypeId, hotel_id: hotelId },
    });
  }

  async update(
    hotelId: number,
    roomTypeId: number,
    updateRoomTypeDto: UpdateRoomTypeDto,
  ) {
    const roomType = await this.findOne(hotelId, roomTypeId);
    if (!roomType) return null;

    Object.assign(roomType, updateRoomTypeDto);
    return this.roomTypeRepository.save(roomType);
  }

  async remove(hotelId: number, roomTypeId: number) {
    const roomType = await this.findOne(hotelId, roomTypeId);
    if (!roomType) return null;

    await this.roomTypeRepository.remove(roomType);
    return roomType;
  }
}
