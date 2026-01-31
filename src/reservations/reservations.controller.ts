import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller({ path: 'reservations', version: '1' })
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  async findAll(@Request() req: { user: User }) {
    const reservations = await this.reservationsService.findAllForGuest(req.user.id);
    return {
      message: 'Reservations fetched successfully',
      data: reservations,
    };
  }

  @Get(':id')
  async findOne(
    @Request() req: { user: User },
    @Param('id', ParseIntPipe) id: number,
  ) {
    const reservation = await this.reservationsService.findOneForGuest(
      req.user.id,
      id,
    );
    return {
      message: 'Reservation found successfully',
      data: reservation,
    };
  }

  @Post()
  async create(
    @Request() req: { user: User },
    @Body() createReservationDto: CreateReservationDto,
  ) {
    const reservation = await this.reservationsService.createForGuest(
      req.user.id,
      createReservationDto,
    );
    return {
      message: 'Reservation created successfully',
      data: reservation,
    };
  }

  @Delete(':id')
  async cancel(
    @Request() req: { user: User },
    @Param('id', ParseIntPipe) id: number,
  ) {
    const reservation = await this.reservationsService.cancelForGuest(
      req.user.id,
      id,
    );
    return {
      message: 'Reservation cancelled successfully',
      data: reservation,
    };
  }
}
