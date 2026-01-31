import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationRepository } from './repositories/reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
  ) {}

  findAllForGuest(guestId: number) {
    return this.reservationRepository.findAllByGuestId(guestId);
  }

  async findOneForGuest(guestId: number, reservationId: number) {
    const reservation = await this.reservationRepository.findOneByIdAndGuestId(
      reservationId,
      guestId,
    );

    if (!reservation) throw new NotFoundException('reservation not found');

    return reservation;
  }

  createForGuest(guestId: number, createReservationDto: CreateReservationDto) {
    return this.reservationRepository.createForGuest(guestId, createReservationDto);
  }

  async cancelForGuest(guestId: number, reservationId: number) {
    const reservation = await this.findOneForGuest(guestId, reservationId);
    reservation.status = 'cancelled';
    return this.reservationRepository.save(reservation);
  }
}
