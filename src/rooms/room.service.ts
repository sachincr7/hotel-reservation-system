import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from './repositories/room.repository';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  create(hotelId: number, createRoomDto: CreateRoomDto) {
    return this.roomRepository.create(hotelId, createRoomDto);
  }

  async findOne(hotelId: number, roomId: number) {
    const room = await this.roomRepository.findOne(hotelId, roomId);
    if (!room) throw new NotFoundException('room not found');
    return room;
  }

  async update(hotelId: number, roomId: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.update(hotelId, roomId, updateRoomDto);
    if (!room) throw new NotFoundException('room not found');
    return room;
  }

  async remove(hotelId: number, roomId: number) {
    const room = await this.roomRepository.remove(hotelId, roomId);
    if (!room) throw new NotFoundException('room not found');
    return room;
  }
}
