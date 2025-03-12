import { Module } from '@nestjs/common';
import { FinishesController } from './finishes.controller';
import { FinishesService } from './finishes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finishes } from './finishes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Finishes])],
  controllers: [FinishesController],
  providers: [FinishesService],
})
export class FinishesModule {}
