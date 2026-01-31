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
  findAll(@Request() req: { user: User }) {
    return this.reservationsService.findAllForGuest(req.user.id);
  }

  @Get(':id')
  findOne(
    @Request() req: { user: User },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservationsService.findOneForGuest(req.user.id, id);
  }

  @Post()
  create(
    @Request() req: { user: User },
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationsService.createForGuest(
      req.user.id,
      createReservationDto,
    );
  }

  @Delete(':id')
  cancel(
    @Request() req: { user: User },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reservationsService.cancelForGuest(req.user.id, id);
  }
}
