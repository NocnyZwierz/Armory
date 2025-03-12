/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finishes } from './finishes.entity';

@Injectable()
export class FinishesService {
  constructor(
    @InjectRepository(Finishes)
    private readonly finishesRepository: Repository<Finishes>,
  ) {}

  async findAll(): Promise<Finishes[]> {
    return await this.finishesRepository.find({order: {id: "ASC"}});
  }
}
