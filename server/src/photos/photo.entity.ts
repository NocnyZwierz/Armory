/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Product } from 'src/products/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;
  

  @ManyToOne(() => Product, (product) => product.photos, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;
}

export { Product };
