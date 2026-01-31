import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Reservation } from 'src/entities/reservation.entity';
import { RoomTypeInventory } from 'src/entities/room_type_inventory.entity';
import { DataSource } from 'typeorm';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationRepository } from './repositories/reservation.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly dataSource: DataSource,
  ) {}

  private getDatesInRangeInclusive(start: string, end: string) {
    const startDate = new Date(`${start}T00:00:00.000Z`);
    const endDate = new Date(`${end}T00:00:00.000Z`);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      throw new BadRequestException('Invalid start_date or end_date');
    }

    if (startDate > endDate) {
      throw new BadRequestException('start_date must be <= end_date');
    }

    const dates: string[] = [];
    const cursor = new Date(startDate);
    while (cursor <= endDate) {
      dates.push(cursor.toISOString().slice(0, 10));
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    return dates;
  }

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

  async createForGuest(guestId: number, createReservationDto: CreateReservationDto) {
    const {
      hotel_id,
      room_type_id,
      start_date,
      end_date,
      number_of_rooms,
    } = createReservationDto;

    if (!Number.isFinite(number_of_rooms) || number_of_rooms <= 0) {
      throw new BadRequestException('number_of_rooms must be a positive number');
    }

    const dates = this.getDatesInRangeInclusive(start_date, end_date);
    const overbookMultiplier = 1.1;

    return this.dataSource.transaction(async (manager) => {
      const inventoryRepo = manager.getRepository(RoomTypeInventory);
      const reservationRepo = manager.getRepository(Reservation);

      const inventories = await inventoryRepo
        .createQueryBuilder('inv')
        .setLock('pessimistic_write')
        .where('inv.hotel_id = :hotelId', { hotelId: hotel_id })
        .andWhere('inv.room_type_id = :roomTypeId', { roomTypeId: room_type_id })
        .andWhere('inv.date IN (:...dates)', { dates })
        .getMany();

      const byDate = new Map(inventories.map((i) => [i.date, i]));
      const missingDates = dates.filter((d) => !byDate.has(d));

      if (missingDates.length > 0) {
        throw new BadRequestException(
          `Inventory not configured for dates: ${missingDates.join(', ')}`,
        );
      }

      for (const date of dates) {
        const inv = byDate.get(date)!;
        const allowed = Math.floor(overbookMultiplier * Number(inv.total_inventory));
        const nextReserved = Number(inv.total_reserved) + number_of_rooms;

        if (nextReserved > allowed) {
          throw new BadRequestException(
            `Insufficient inventory for date ${date}. Requested ${number_of_rooms}. Available (with 10% overbooking): ${Math.max(0, allowed - Number(inv.total_reserved))}`,
          );
        }
      }

      for (const date of dates) {
        const inv = byDate.get(date)!;
        inv.total_reserved = Number(inv.total_reserved) + number_of_rooms;
        await inventoryRepo.save(inv);
      }

      const reservation = reservationRepo.create({
        hotel_id,
        room_type_id,
        start_date,
        end_date,
        number_of_rooms,
        guest_id: guestId,
        status: 'confirmed',
      });

      return reservationRepo.save(reservation);
    });
  }

  async cancelForGuest(guestId: number, reservationId: number) {
    const reservation = await this.findOneForGuest(guestId, reservationId);
    reservation.status = 'cancelled';
    return this.reservationRepository.save(reservation);
  }
}
