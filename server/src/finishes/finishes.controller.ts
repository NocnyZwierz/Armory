/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { FinishesService } from './finishes.service';
import { Finishes } from './finishes.entity';

@Controller('finishes')
export class FinishesController {
  constructor(private readonly finsishesService: FinishesService) {}

  @Get()
  getAllFinishes(): Promise<Finishes[]> {
    return this.finsishesService.findAll();
  }
}
