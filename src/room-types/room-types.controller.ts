import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { RoomTypesService } from './room-types.service';

@Roles('staff')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'hotels/:hotelId/room-types', version: '1' })
export class RoomTypesController {
  constructor(private readonly roomTypesService: RoomTypesService) {}

  @Post()
  async create(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Body() createRoomTypeDto: CreateRoomTypeDto,
  ) {
    const roomType = await this.roomTypesService.create(hotelId, createRoomTypeDto);
    return {
      message: 'Room type created successfully',
      data: roomType,
    };
  }

  @Get()
  async findAll(@Param('hotelId', ParseIntPipe) hotelId: number) {
    const roomTypes = await this.roomTypesService.findAll(hotelId);
    return {
      message: 'Room types fetched successfully',
      data: roomTypes,
    };
  }

  @Get(':id')
  async findOne(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const roomType = await this.roomTypesService.findOne(hotelId, id);
    return {
      message: 'Room type found successfully',
      data: roomType,
    };
  }

  @Put(':id')
  async update(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
  ) {
    const roomType = await this.roomTypesService.update(hotelId, id, updateRoomTypeDto);
    return {
      message: 'Room type updated successfully',
      data: roomType,
    };
  }

  @Delete(':id')
  async remove(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const roomType = await this.roomTypesService.remove(hotelId, id);
    return {
      message: 'Room type deleted successfully',
      data: roomType,
    };
  }

  @Post(':roomTypeId/inventory/seed')
  async seedInventory(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('roomTypeId', ParseIntPipe) roomTypeId: number,
    @Query('days') days?: string,
    @Query('from') from?: string,
  ) {
    const today = new Date().toISOString().slice(0, 10);
    const numDays = days ? parseInt(days, 10) : 30;

    const result = await this.roomTypesService.seedInventory(
      hotelId,
      roomTypeId,
      from ?? today,
      numDays,
    );

    return {
      message: 'Room type inventory seeded successfully',
      data: result,
    };
  }
}
