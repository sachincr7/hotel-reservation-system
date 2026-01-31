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

import { Hotel } from './hotel.entity';
import { RoomType } from './room_type.entity';
import { User } from './user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn({ name: 'reservation_id' })
  reservation_id: number;

  @IsNumber()
  @Column({ type: 'int4' })
  hotel_id: number;

  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @IsNumber()
  @Column({ type: 'int4' })
  room_type_id: number;

  @ManyToOne(() => RoomType)
  @JoinColumn({ name: 'room_type_id' })
  room_type: RoomType;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @IsString()
  @Column()
  status: string;

  @IsNumber()
  @Column({ type: 'int4' })
  guest_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'guest_id' })
  guest: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
