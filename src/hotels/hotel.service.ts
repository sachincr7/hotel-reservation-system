import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelRepository } from './repositories/hotel.repository';
import { HotelRoomRepository } from './repositories/hotel-room.repository';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';
import { UpdateRoomDto } from 'src/rooms/dto/update-room.dto';
import { RoomTypesService } from 'src/room-types/room-types.service';

@Injectable()
export class HotelService {
  constructor(
    private readonly hotelRepository: HotelRepository,
    private readonly hotelRoomRepository: HotelRoomRepository,
    private readonly roomTypesService: RoomTypesService,
  ) {}

  create(createHotelDto: CreateHotelDto) {
    return this.hotelRepository.create(createHotelDto);
  }

  findAll() {
    return this.hotelRepository.findAll();
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

  async createRoom(hotelId: number, createRoomDto: CreateRoomDto) {
    const roomType = await this.roomTypesService.findOne(
      hotelId,
      createRoomDto.room_type_id,
    );
    if (!roomType) throw new NotFoundException('room type not found');
    return this.hotelRoomRepository.create(hotelId, createRoomDto);
  }

  async findRoom(hotelId: number, roomId: number) {
    const room = await this.hotelRoomRepository.findOne(hotelId, roomId);
    if (!room) throw new NotFoundException('room not found');
    return room;
  }

  async updateRoom(
    hotelId: number,
    roomId: number,
    updateRoomDto: UpdateRoomDto,
  ) {
    const room = await this.hotelRoomRepository.update(
      hotelId,
      roomId,
      updateRoomDto,
    );
    if (!room) throw new NotFoundException('room not found');
    return room;
  }

  async removeRoom(hotelId: number, roomId: number) {
    const room = await this.hotelRoomRepository.remove(hotelId, roomId);
    if (!room) throw new NotFoundException('room not found');
    return room;
  }
}
