import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Hotel } from 'src/entities/hotel.entity';
import { Room } from 'src/entities/room.entity';
import { RoomType } from 'src/entities/room_type.entity';
import { RoomTypeInventory } from 'src/entities/room_type_inventory.entity';

import { CreateHotelController } from './controllers/create-hotel.controller';
import { GetHotelsController } from './controllers/get-hotels.controller';
import { HotelByIdController } from './controllers/hotel-by-id.controller';
import { HotelRoomRepository } from './repositories/hotel-room.repository';
import { HotelRepository } from './repositories/hotel.repository';
import { HotelService } from './hotel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel, Room, RoomType, RoomTypeInventory]),
    AuthModule,
  ],
  controllers: [CreateHotelController, GetHotelsController, HotelByIdController],
  providers: [HotelService, HotelRepository, HotelRoomRepository],
  exports: [HotelService],
})
export class HotelModule {}
