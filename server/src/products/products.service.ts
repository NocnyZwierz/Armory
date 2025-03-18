/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { promises as fs } from 'fs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async search(query: string): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .where(
        'LOWER(product.title) LIKE :query OR LOWER(product.description) LIKE :query',
        {
          query: `%${query.toLowerCase()}%`,
        },
      )
      .getMany();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!updatedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<{ message: string }> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['photos'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    for (const photo of product.photos) {
      try {
        await fs.unlink(photo.path);
        console.log(`Deleted file: ${photo.path}`);
      } catch (error) {
        console.error(`Error deleting file ${photo.path}:`, error);
      }
    }

    // Usuwamy produkt (przy cascade: true zdjęcia zostaną usunięte z bazy automatycznie)
    await this.productRepository.remove(product);
    return { message: 'Product and its photos deleted successfully' };
  }
}

