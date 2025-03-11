import { Module } from '@nestjs/common';
import { FinishesController } from './finishes.controller';
import { FinishesService } from './finishes.service';

@Module({
  controllers: [FinishesController],
  providers: [FinishesService]
})
export class FinishesModule {}
