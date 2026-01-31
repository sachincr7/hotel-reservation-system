import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Hotel } from './hotel.entity';
import type { RoomType } from './room_type.entity';
import type { User } from './user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column({ type: 'int4' })
  hotel_id: number;

  @ManyToOne(() => require('./hotel.entity').Hotel)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @IsNumber()
  @Column({ type: 'int4' })
  room_type_id: number;

  @ManyToOne(() => require('./room_type.entity').RoomType)
  @JoinColumn({ name: 'room_type_id' })
  room_type: RoomType;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @IsNumber()
  @Column({ type: 'int4' })
  number_of_rooms: number;

  @IsString()
  @Column()
  status: string;

  @IsNumber()
  @Column({ type: 'int4' })
  guest_id: number;

  @ManyToOne(() => require('./user.entity').User)
  @JoinColumn({ name: 'guest_id' })
  guest: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
