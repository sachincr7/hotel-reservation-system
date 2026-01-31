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

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateHotelDto } from '../dto/update-hotel.dto';
import { HotelService } from '../hotel.service';

@Controller({ path: 'hotels', version: '1' })
export class HotelByIdController {
  constructor(private readonly hotelService: HotelService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const hotel = await this.hotelService.findOne(id);
    return {
      message: 'Hotel found successfully',
      data: hotel,
    };
  }

  @Roles('staff')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHotelDto: UpdateHotelDto,
  ) {
    const hotel = await this.hotelService.update(id, updateHotelDto);
    return {
      message: 'Hotel updated successfully',
      data: hotel,
    };
  }

  @Roles('staff')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const hotel = await this.hotelService.remove(id);
    return {
      message: 'Hotel deleted successfully',
      data: hotel,
    };
  }
}
