import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Hotel } from './hotel.entity';

@Entity()
export class RoomTypeRate {
  @PrimaryColumn({ type: 'int4' })
  id: number;

  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @PrimaryColumn({ type: 'date' })
  date: string;

  @Column({ type: 'int8' })
  rate: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
