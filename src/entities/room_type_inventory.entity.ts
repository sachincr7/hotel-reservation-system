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

import type { Hotel } from './hotel.entity';
import type { RoomType } from './room_type.entity';

@Entity()
@Unique(['hotel_id', 'room_type_id', 'date'])
export class RoomTypeInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotel_id: number;

  @ManyToOne(() => require('./hotel.entity').Hotel)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @Column()
  room_type_id: number;

  @ManyToOne(
    () => require('./room_type.entity').RoomType,
    (roomType: RoomType) => roomType.inventories,
  )
  @JoinColumn({ name: 'room_type_id' })
  room_type: RoomType;

  /**
   * Date for which the inventory is configured
   */
  @Column({ type: 'date' })
  date: string;

  /**
   * Total inventory available for the room type on the given date
   */
  @Column({ type: 'int8' })
  total_inventory: number;

  /**
   * Total number of rooms reserved for the room type on the given date
   */
  @Column({ type: 'int8', default: 0 })
  total_reserved: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
