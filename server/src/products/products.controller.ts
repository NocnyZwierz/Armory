/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ValidationPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { AuthGuard } from 'src/guard/admin.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  getProduct(@Param('id') id: string):Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(new AuthGuard())
  createProduct(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @UseGuards(new AuthGuard())
  updateProduct(
    @Param('id') id: string,
    @Body(new ValidationPipe({ skipMissingProperties:true })) updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }
  
  @Get('search/:query')
  searchProducts(@Param('query') query: string): Promise<Product[]> {
    return this.productsService.search(query);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  deleteProduct(@Param('id') id: string): Promise< { message: string }> {
    return this.productsService.remove(id);
  }
}
