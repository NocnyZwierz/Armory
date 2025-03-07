/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  category: string;

  @Column({ default: false })
  new: boolean;

  @Column({ default: false })
  featured: boolean;

  @Column()
  img: string;

  @Column({ type: 'text' })
  description: string;
}
