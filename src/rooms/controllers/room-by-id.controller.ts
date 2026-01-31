import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HotelService } from 'src/hotels/hotel.service';
import { UpdateRoomDto } from '../dto/update-room.dto';

@Controller({ path: 'hotels/:hotelId/rooms', version: '1' })
export class RoomByIdController {
  constructor(private readonly hotelService: HotelService) {}

  @Get(':id')
  findOne(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.hotelService.findRoom(hotelId, id);
  }

  @Roles('staff')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  update(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.hotelService.updateRoom(hotelId, id, updateRoomDto);
  }

  @Roles('staff')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.hotelService.removeRoom(hotelId, id);
  }
}
