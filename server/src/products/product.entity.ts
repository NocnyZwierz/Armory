/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length, Max, Min } from 'class-validator';
import { Photo } from 'src/photos/photo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  @Length(1, 500)
  title: string;

  @IsNotEmpty()
  @Column('decimal', { precision: 10, scale: 2 })
  @Min(1)
  @Max(100000)
  price: number;

  @IsNotEmpty()
  @Column()
  @Length(1, 500)
  category: string;

  @IsNotEmpty()
  @Column({ default: false })
  new: boolean;

  @IsNotEmpty()
  @Column({ default: false })
  featured: boolean;

  @IsNotEmpty()
  @Column()
  @Length(1, 500)
  img: string;

  @IsNotEmpty()
  @Column({ type: 'text' })
  @Length(1, 1000)
  description: string;
  
  @IsNotEmpty()
  @OneToMany(() => Photo, (photo) => photo.product)
  photos: Photo[];
}
