import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/entities/hotel.entity';

import { CreateHotelController } from './controllers/create-hotel.controller';
import { HotelRepository } from './repositories/hotel.repository';
import { HotelService } from './hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  controllers: [CreateHotelController],
  providers: [HotelService, HotelRepository],
})
export class HotelModule {}
