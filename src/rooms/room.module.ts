import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Room } from 'src/entities/room.entity';

import { CreateRoomController } from './controllers/create-room.controller';
import { RoomByIdController } from './controllers/room-by-id.controller';
import { RoomRepository } from './repositories/room.repository';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), AuthModule],
  controllers: [CreateRoomController, RoomByIdController],
  providers: [RoomService, RoomRepository],
})
export class RoomModule {}
