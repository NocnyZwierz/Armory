/* eslint-disable prettier/prettier */
// products.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Product {
    return this.productsService.findOne(id);
  }

  @Post()
  createProduct(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
  ): Product {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body(new ValidationPipe({ skipMissingProperties:true })) updateProductDto: UpdateProductDto,
  ): Product {
    return this.productsService.update(id, updateProductDto);
  }
  @Get('search/:query')
  searchProducts(@Param('query') query: string): Product[] {
    return this.productsService.search(query);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): { message: string } {
    return this.productsService.remove(id);
  }
}
