/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  Length,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  title: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100000)
  price: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  category: string;

  @IsBoolean()
  new: boolean;

  @IsBoolean()
  featured: boolean;

  @IsString()
  img: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  description: string;
}
