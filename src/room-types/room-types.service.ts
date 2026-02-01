import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { RoomTypeInventory } from 'src/entities/room_type_inventory.entity';
import { Repository } from 'typeorm';

import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { RoomTypeRepository } from './repositories/room-type.repository';

@Injectable()
export class RoomTypesService {
  constructor(
    private readonly roomTypeRepository: RoomTypeRepository,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RoomTypeInventory)
    private readonly roomTypeInventoryRepository: Repository<RoomTypeInventory>,
  ) {}

  private getDatesInRange(from: string, days: number) {
    const startDate = new Date(`${from}T00:00:00.000Z`);
    if (Number.isNaN(startDate.getTime())) {
      throw new BadRequestException('Invalid from date');
    }

    if (!Number.isFinite(days) || days <= 0) {
      throw new BadRequestException('days must be a positive number');
    }

    const dates: string[] = [];
    const cursor = new Date(startDate);
    const endDate = new Date(startDate);
    endDate.setUTCDate(endDate.getUTCDate() + (days - 1));

    while (cursor <= endDate) {
      dates.push(cursor.toISOString().slice(0, 10));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return dates;
  }

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

  async seedInventory(hotelId: number, roomTypeId: number, from: string, days: number) {
    const roomType = await this.roomTypeRepository.findOne(hotelId, roomTypeId);
    if (!roomType) throw new NotFoundException('room type not found');

    const cappedDays = Math.min(days, 365);
    const dates = this.getDatesInRange(from, cappedDays);

    const totalInventory = await this.roomRepository.count({
      where: { hotel_id: hotelId, room_type_id: roomTypeId, is_available: true },
    });

    const rows = dates.map((date) => ({
      hotel_id: hotelId,
      room_type_id: roomTypeId,
      date,
      total_inventory: totalInventory,
    }));

    const result = await this.roomTypeInventoryRepository
      .createQueryBuilder()
      .insert()
      .into(RoomTypeInventory)
      .values(rows)
      .orIgnore()
      .execute();

    return {
      hotel_id: hotelId,
      room_type_id: roomTypeId,
      from,
      days: cappedDays,
      total_inventory: totalInventory,
      inserted: result.identifiers.length,
    };
  }
}
