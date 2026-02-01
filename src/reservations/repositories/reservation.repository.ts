import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { Repository } from 'typeorm';

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
      where: { id, guest_id: guestId },
    });
  }

  findOneByReservationIdAndGuestId(reservationId: number, guestId: number) {
    return this.reservationRepository.findOne({
      where: { id: reservationId, guest_id: guestId },
    });
  }

  findOneByReservationId(reservationId: number) {
    return this.reservationRepository.findOne({
      where: { id: reservationId },
    });
  }

  save(reservation: Reservation) {
    return this.reservationRepository.save(reservation);
  }
}
