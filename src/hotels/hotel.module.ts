import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Hotel } from 'src/entities/hotel.entity';

import { CreateHotelController } from './controllers/create-hotel.controller';
import { HotelByIdController } from './controllers/hotel-by-id.controller';
import { HotelRepository } from './repositories/hotel.repository';
import { HotelService } from './hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), AuthModule],
  controllers: [CreateHotelController, HotelByIdController],
  providers: [HotelService, HotelRepository],
})
export class HotelModule {}
