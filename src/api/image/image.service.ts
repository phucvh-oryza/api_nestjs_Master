// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Photo } from './photo.entity';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { v4 as uuidv4 } from 'uuid';

// @Injectable()
// export class PhotoService {
//   constructor(
//     @InjectRepository(Photo)
//     private photoRepository: Repository<Photo>,
//   ) {}

//   async uploadFiles(files: Array<Express.Multer.File>): Promise<Photo[]> {
//     const uploadedFiles = [];
//     const filename = uuidv4() + '_' + Date.now().toString();
//     for (let file of files) {
//       const photo = new Photo();
//       photo.filename = filename;
//       photo.mimetype = file.mimetype;
//       photo.path = 'D:a';

//       const savedPhoto = await this.photoRepository.save(photo);
//       uploadedFiles.push(savedPhoto);
//     }

//     return uploadedFiles;
//   }

//   multerOptions = {
//     storage: diskStorage({
//       destination: './uploads',
//       filename: (req, file, cb) => {
//         const randomName = Array(32)
//           .fill(null)
//           .map(() => Math.round(Math.random() * 16).toString(16))
//           .join('');
//         return cb(null, `${randomName}${extname(file.originalname)}`);
//       },
//     }),
//   };
// }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Images } from '../../entities/image.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as express from 'express';
import * as path from 'path';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Images) private imageRepository: Repository<Images>,
  ) {}

  async findAll(): Promise<Images[]> {
    return this.imageRepository.find();
  }
  async findAllbyID(ProductID: string): Promise<Images[]> {
    return await this.imageRepository.find({ where: { ProductID: ProductID } });
  }
  async findOne(ProductID: string): Promise<Images> {
    return await this.imageRepository.findOneBy({ ID: ProductID });
  }

  async create(
    ProductID: string,
    UserID: number,
    files: Array<Express.Multer.File>,
  ): Promise<Images[]> {
    const images: Images[] = [];

    for (const file of files) {
      const image = new Images();
      image.ID = uuidv4();
      image.Name = file.originalname;
      image.Size = 0;
      image.Type = file.mimetype;
      image.Url = `uploads/${image.ID}-${image.Name}`;
      image.CreatedAt = new Date(); // thêm trường createdAt
      image.ProductID = ProductID;
      images.push(image);
      image.UserID = UserID;
      await this.imageRepository.save(image);

      const fs = require('fs');
      fs.writeFileSync(image.Url, file.buffer);
    }

    return images;
  }

  async delete(ID: string): Promise<void> {
    const photo = await this.imageRepository.findOneBy({ ID: ID });
    const filePath = './uploads/';
    fs.unlinkSync(filePath + photo.ID + '-' + photo.Name); // xóa file ảnh
    await this.imageRepository.delete(ID); // xóa dữ liệu trong database
  }
}
