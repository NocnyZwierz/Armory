/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  Get,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { Photo } from './photo.entity';
import { storage } from './multer.config';
import { AuthGuard } from 'src/guard/admin.guard';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @UseGuards(new AuthGuard())
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage,
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('productId') productId: string,
  ): Promise<Photo[]> {
    const savedFiles: Photo[] = [];
    for (const file of files) {
      const savedFile = await this.photosService.saveFileData(file, productId);
      savedFiles.push(savedFile);
    }
    return savedFiles;
  }

  @Get(':id')
  async getPhoto(@Param('id') id: string): Promise<Photo[]> {
    const photos = await this.photosService.findOne(id);
    if (!photos) {
      throw new NotFoundException('Photo not found');
    }
    return photos;
  }
}
