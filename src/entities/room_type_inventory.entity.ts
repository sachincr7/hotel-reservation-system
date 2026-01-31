import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

import { Hotel } from './hotel.entity';
import { RoomType } from './room_type.entity';

@Entity()
@Unique(['hotel_id', 'room_type_id', 'date'])
export class RoomTypeInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotel_id: number;

  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @Column({ type: 'int4' })
  room_type_id: number;

  @ManyToOne(() => RoomType, (roomType) => roomType.inventories)
  @JoinColumn({ name: 'room_type_id' })
  room_type: RoomType;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'int8' })
  total_inventory: number;

  @Column({ type: 'int8', default: 0 })
  total_reserved: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
