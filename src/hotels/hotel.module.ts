import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Hotel } from 'src/entities/hotel.entity';
import { RoomType } from 'src/entities/room_type.entity';
import { RoomTypeInventory } from 'src/entities/room_type_inventory.entity';

import { CreateHotelController } from './controllers/create-hotel.controller';
import { HotelByIdController } from './controllers/hotel-by-id.controller';
import { HotelRepository } from './repositories/hotel.repository';
import { HotelService } from './hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, RoomType, RoomTypeInventory]), AuthModule],
  controllers: [CreateHotelController, HotelByIdController],
  providers: [HotelService, HotelRepository],
})
export class HotelModule {}
