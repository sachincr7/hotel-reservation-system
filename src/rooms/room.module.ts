import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { HotelModule } from 'src/hotels/hotel.module';

import { CreateRoomController } from './controllers/create-room.controller';
import { RoomByIdController } from './controllers/room-by-id.controller';

@Module({
  imports: [AuthModule, HotelModule],
  controllers: [CreateRoomController, RoomByIdController],
})
export class RoomModule {}
