/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  new: boolean;

  @IsBoolean()
  featured: boolean;

  @IsString()
  img: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
