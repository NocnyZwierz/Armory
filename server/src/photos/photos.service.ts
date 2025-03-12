/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async saveFileData(fileData: any, productId: string): Promise<Photo> {
    const photo = new Photo();
    photo.filename = fileData.originalname;
    photo.path = fileData.path;
    photo.mimetype = fileData.mimetype;
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product || !productId) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    photo.product = product;
    return this.photoRepository.save(photo);
  }
}
