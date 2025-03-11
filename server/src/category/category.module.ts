/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoryModule {}
