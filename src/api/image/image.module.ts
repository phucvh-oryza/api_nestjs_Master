import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Images } from '../../entities/image.entity';
import { ImageService } from './image.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forFeature([Images]),
  ],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
