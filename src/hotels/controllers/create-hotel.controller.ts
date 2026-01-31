import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { HotelService } from '../hotel.service';

@Controller('v1/hotels')
export class CreateHotelController {
  constructor(private readonly hotelService: HotelService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }
}
