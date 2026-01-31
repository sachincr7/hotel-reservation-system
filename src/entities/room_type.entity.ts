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

import { Hotel } from './hotel.entity';
import { Room } from './room.entity';
import { RoomTypeInventory } from './room_type_inventory.entity';

@Entity()
export class RoomType {
  @PrimaryGeneratedColumn({ name: 'room_type_id' })
  room_type_id: number;

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

  @ManyToOne(() => Hotel, (hotel) => hotel.room_types)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @OneToMany(() => Room, (room) => room.room_type)
  rooms: Room[];

  @OneToMany(() => RoomTypeInventory, (inventory) => inventory.room_type)
  inventories: RoomTypeInventory[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
