/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { db } from './../db';

@Injectable()
export class ProductsService {
  search(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery),
    );
  }
  private products: Product[] = db.items;

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(createProductDto: CreateProductDto): Product {
    const { ...productData } = createProductDto;
    const newProduct: Product = {
      ...productData,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const existingProduct = this.products[index];

    for (const key in updateProductDto) {
      if (
        existingProduct[key] !== undefined &&
        existingProduct[key] !== null &&
        updateProductDto[key] !== undefined &&
        updateProductDto[key] !== null
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        existingProduct[key] = updateProductDto[key];
      }
    }

    this.products[index] = existingProduct;
    return existingProduct;
  }

  remove(id: string): { message: string } {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
    return { message: 'Product deleted successfully' };
  }
}
