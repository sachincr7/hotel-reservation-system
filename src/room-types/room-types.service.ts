import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { RoomTypeRepository } from './repositories/room-type.repository';

@Injectable()
export class RoomTypesService {
  constructor(private readonly roomTypeRepository: RoomTypeRepository) {}

  create(hotelId: number, createRoomTypeDto: CreateRoomTypeDto) {
    return this.roomTypeRepository.create(hotelId, createRoomTypeDto);
  }

  findAll(hotelId: number) {
    return this.roomTypeRepository.findAll(hotelId);
  }

  async findOne(hotelId: number, roomTypeId: number) {
    const roomType = await this.roomTypeRepository.findOne(hotelId, roomTypeId);
    if (!roomType) throw new NotFoundException('room type not found');
    return roomType;
  }

  async update(
    hotelId: number,
    roomTypeId: number,
    updateRoomTypeDto: UpdateRoomTypeDto,
  ) {
    const roomType = await this.roomTypeRepository.update(
      hotelId,
      roomTypeId,
      updateRoomTypeDto,
    );

    if (!roomType) throw new NotFoundException('room type not found');
    return roomType;
  }

  async remove(hotelId: number, roomTypeId: number) {
    const roomType = await this.roomTypeRepository.remove(hotelId, roomTypeId);
    if (!roomType) throw new NotFoundException('room type not found');
    return roomType;
  }
}
