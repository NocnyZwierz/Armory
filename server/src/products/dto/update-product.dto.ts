/* eslint-disable prettier/prettier */

import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  Length,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  title: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100000)
  price: number;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  category: string;

  @IsOptional()
  @IsBoolean()
  new: boolean;

  @IsOptional()
  @IsBoolean()
  featured: boolean;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  img: string;

  @IsOptional()
  @IsString()
  @Length(1, 1000)
  description?: string;
}
