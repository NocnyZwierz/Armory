/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  customerName: string;
  
  @IsNotEmpty()
  @Column()
  customerSurname: string;

  @IsNotEmpty()
  @Column()
  deliveryAddress: string;

  @IsNotEmpty()
  @Column()
  customerEmail: string;

  @IsNotEmpty()
  @Column('simple-json')
  items: { productId: string; price: number; quantity: number }[];

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}