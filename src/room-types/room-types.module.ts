import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Room } from 'src/entities/room.entity';
import { RoomType } from 'src/entities/room_type.entity';
import { RoomTypeInventory } from 'src/entities/room_type_inventory.entity';

import { RoomTypesController } from './room-types.controller';
import { RoomTypeRepository } from './repositories/room-type.repository';
import { RoomTypesService } from './room-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomType, RoomTypeInventory]), AuthModule],
  controllers: [RoomTypesController],
  providers: [RoomTypesService, RoomTypeRepository],
})
export class RoomTypesModule {}
