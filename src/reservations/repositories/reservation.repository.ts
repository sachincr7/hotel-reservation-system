import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { Repository } from 'typeorm';

import { CreateReservationDto } from '../dto/create-reservation.dto';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  findAllByGuestId(guestId: number) {
    return this.reservationRepository.find({
      where: { guest_id: guestId },
      order: { created_at: 'DESC' },
    });
  }

  findOneByIdAndGuestId(id: number, guestId: number) {
    return this.reservationRepository.findOne({
      where: { reservation_id: id, guest_id: guestId },
    });
  }

  createForGuest(guestId: number, createReservationDto: CreateReservationDto) {
    const reservation = this.reservationRepository.create({
      ...createReservationDto,
      guest_id: guestId,
      status: 'confirmed',
    });

    return this.reservationRepository.save(reservation);
  }

  save(reservation: Reservation) {
    return this.reservationRepository.save(reservation);
  }
}
