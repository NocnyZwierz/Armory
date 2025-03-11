/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  customerSurname: string;


  @IsString()
  @IsNotEmpty()
  customerEmail: string;

  @IsArray()
  items: { productId: string; quantity: number }[];

  @IsNumber()
  totalAmount: number;
}