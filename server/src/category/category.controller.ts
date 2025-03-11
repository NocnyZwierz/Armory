/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { Categories } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories(): Promise<Categories[]> {
    return this.categoriesService.findAll();
  }
}