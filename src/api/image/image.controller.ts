// import {
//   Controller,
//   Post,
//   UseInterceptors,
//   UploadedFiles,
//   BadRequestException,
// } from '@nestjs/common';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import { PhotoService } from './photo.service';

// @Controller('photo')
// export class PhotoController {
//   constructor(private readonly photoService: PhotoService) {}

//   @Post('upload')
//   @UseInterceptors(FilesInterceptor('files'))
//   async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
//     if (!files) {
//       throw new BadRequestException('No files uploaded.');
//     }

//     const uploadedFiles = await this.photoService.uploadFiles(files);

//     return { files: uploadedFiles };
//   }
// }

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Images } from '../../entities/image.entity';
import { ImageService } from './image.service';
@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('all')
  findAll() {
    return this.imageService.findAll();
  }

  // @Get('allbyProductID/:ProductID')
  // async findAllById(@Param('ProductID') ProductID: string) {
  //   return this.imageService.findAllbyID(ProductID);
  // }

  @Post('create/:ProductID/:UserID')
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Param('ProductID')
    ProductID: string,
    @Param('UserID')
    UserID: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(ProductID);
    return this.imageService.create(ProductID, UserID, files);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.imageService.delete(id);
  }
}
