import { Controller, Get } from '@nestjs/common';

import { HotelService } from '../hotel.service';

@Controller({ path: 'hotels', version: '1' })
export class GetHotelsController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  async findAll() {
    const hotels = await this.hotelService.findAll();
    return {
      message: 'Hotels fetched successfully',
      data: hotels,
    };
  }
}