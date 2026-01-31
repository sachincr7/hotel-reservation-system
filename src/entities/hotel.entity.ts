import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Room } from './room.entity';
import type { RoomType } from './room_type.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  address: string;

  @IsString()
  @Column()
  location: string;

  @OneToMany(
    () => require('./room.entity').Room,
    (room: Room) => room.hotel,
  )
  rooms: Room[];

  @OneToMany(
    () => require('./room_type.entity').RoomType,
    (roomType: RoomType) => roomType.hotel,
  )
  room_types: RoomType[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
