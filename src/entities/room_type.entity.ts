import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Hotel } from './hotel.entity';
import type { Room } from './room.entity';
import type { RoomTypeInventory } from './room_type_inventory.entity';

@Entity()
export class RoomType {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  description: string;

  @IsNumber()
  @Column({ type: 'int4' })
  max_occupancy: number;

  @IsString()
  @Column()
  amenities: string;

  @IsNumber()
  @Column({ type: 'int4' })
  hotel_id: number;

  @ManyToOne(
    () => require('./hotel.entity').Hotel,
    (hotel: Hotel) => hotel.room_types,
  )
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @OneToMany(
    () => require('./room.entity').Room,
    (room: Room) => room.room_type,
  )
  rooms: Room[];

  @OneToMany(
    () => require('./room_type_inventory.entity').RoomTypeInventory,
    (inventory: RoomTypeInventory) => inventory.room_type,
  )
  inventories: RoomTypeInventory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
