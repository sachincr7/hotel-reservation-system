import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { HotelService } from '../hotel.service';

@Controller({ path: 'hotels', version: '1' })
export class CreateHotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Roles('staff')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }
}
