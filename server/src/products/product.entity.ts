/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Photo } from 'src/photos/photo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  title: string;

  @IsNotEmpty()
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @IsNotEmpty()
  @Column()
  category: string;

  @IsNotEmpty()
  @Column({ default: false })
  new: boolean;

  @IsNotEmpty()
  @Column({ default: false })
  featured: boolean;

  @IsNotEmpty()
  @Column()
  img: string;

  @IsNotEmpty()
  @Column({ type: 'text' })
  description: string;
  
  @IsNotEmpty()
  @OneToMany(() => Photo, (photo) => photo.product)
  photos: Photo[];
}
