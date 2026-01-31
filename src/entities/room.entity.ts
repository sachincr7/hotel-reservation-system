import { IsBoolean, IsNumber, IsString } from 'class-validator';
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

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column({ type: 'int4' })
  floor: number;

  @IsNumber()
  @Column({ type: 'int4' })
  number: number;

  @IsString()
  @Column()
  name: string;

  @IsNumber()
  @Column({ type: 'int4' })
  room_type_id: number;

  @Column({ default: true })
  @IsBoolean()
  is_available: boolean;

  @IsNumber()
  @Column()
  hotel_id: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
  @JoinColumn({ name: 'room_type_id' })
  room_type: RoomType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
