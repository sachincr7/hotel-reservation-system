import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { HotelService } from 'src/hotels/hotel.service';
import { CreateRoomDto } from '../dto/create-room.dto';

@Controller({ path: 'hotels/:hotelId/rooms', version: '1' })
export class CreateRoomController {
  constructor(private readonly hotelService: HotelService) {}

  @Roles('staff')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return this.hotelService.createRoom(hotelId, createRoomDto);
  }
}
