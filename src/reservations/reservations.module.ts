import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Hotel } from 'src/entities/hotel.entity';
import { Reservation } from 'src/entities/reservation.entity';
import { RoomType } from 'src/entities/room_type.entity';
import { User } from 'src/entities/user.entity';

import { ReservationRepository } from './repositories/reservation.repository';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Hotel, RoomType, User]),
    AuthModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
