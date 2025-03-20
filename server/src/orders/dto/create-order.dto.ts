/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  Length,
  IsEmail,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  customerName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  customerSurname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  deliveryAddress: string;

  @IsArray()
  items: { productId: string; quantity: number }[];

  @IsNumber()
  totalAmount: number;
}
