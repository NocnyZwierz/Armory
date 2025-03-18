/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { AuthGuard } from 'src/guard/admin.guard';

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
  @UseGuards(new AuthGuard())
  getAllOrders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
