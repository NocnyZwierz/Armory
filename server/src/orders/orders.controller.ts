/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(
    @Body(new ValidationPipe()) createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  getAllOrders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
