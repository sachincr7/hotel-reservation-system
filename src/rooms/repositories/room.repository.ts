import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';

@Injectable()
export class RoomRepository {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  create(hotelId: number, createRoomDto: CreateRoomDto) {
    const room = this.roomRepository.create({
      ...createRoomDto,
      hotel_id: hotelId,
    });
    return this.roomRepository.save(room);
  }

  findOne(hotelId: number, roomId: number) {
    return this.roomRepository.findOne({
      where: { id: roomId, hotel_id: hotelId },
    });
  }

  async update(hotelId: number, roomId: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(hotelId, roomId);
    if (!room) return null;
    Object.assign(room, updateRoomDto);
    return this.roomRepository.save(room);
  }

  async remove(hotelId: number, roomId: number) {
    const room = await this.findOne(hotelId, roomId);
    if (!room) return null;
    await this.roomRepository.remove(room);
    return room;
  }
}
