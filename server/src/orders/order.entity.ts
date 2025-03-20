/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  @Length(1, 100)
  customerName: string;
  
  @IsNotEmpty()
  @Column()
  @Length(1, 100)
  customerSurname: string;

  @IsNotEmpty()
  @Column()
  @Length(1, 500)
  deliveryAddress: string;

  @IsNotEmpty()
  @Column()
  @IsEmail()
  @Length(1, 100)
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