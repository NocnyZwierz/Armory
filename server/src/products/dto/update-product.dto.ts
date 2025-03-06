/* eslint-disable prettier/prettier */
 
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsBoolean()
  new: boolean;

  @IsOptional()
  @IsBoolean()
  featured: boolean;

  @IsOptional()
  @IsString()
  img: string;

  @IsOptional()
  @IsString()
  description?: string;
}
