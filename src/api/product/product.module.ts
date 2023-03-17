import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Categogys } from '../../entities/categogy.entity';
import { CategogyService } from '../categogy/categogy.service';
import { Images } from '../../entities/image.entity';
import { ImageService } from '../image/image.service';

import { Users } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';
import { Products } from '../../entities/product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Users, Categogys, Images])],
  providers: [ProductService, UsersService, CategogyService, ImageService],
  exports: [ProductService, UsersService, CategogyService, ImageService],
})
export class ProductModule {}
