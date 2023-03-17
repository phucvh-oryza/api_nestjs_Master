import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CategogyService } from '../categogy/categogy.service';
import { ImageService } from '../image/image.service';
import { Users } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';
import { Products } from '../../entities/product.entity';
import { ProductsRespone } from '../../dto/product.respone';
import { UpdateProductDto } from '../../dto/updateProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,
    private readonly imageService: ImageService,
    private readonly usersService: UsersService,
    private readonly categogyService: CategogyService,
  ) {}

  async findAll(): Promise<Products[]> {
    return await this.productRepo.find();
  }

  async findOne(ID: string): Promise<Products> {
    return await this.productRepo.findOneBy({ ID: ID });
  }

  async findAllwithImage(productId: string): Promise<ProductsRespone> {
    const product = await this.findOne(productId);
    const listImages = await this.imageService.findAllbyID(productId);

    const productResponse = new ProductsRespone();
    productResponse.ID = product.ID;
    productResponse.Name = product.Name;
    productResponse.Description = product.Description;
    productResponse.Price = product.Price;
    productResponse.Quantity = product.Quantity;
    productResponse.Datemade = product.Datemade;
    productResponse.CategoryID = product.CategogyID;
    productResponse.UserID = product.UserID;
    productResponse.Status = product.Status;
    productResponse.CreatedAt = product.CreatedAt;
    productResponse.ListImages = listImages; // Assign the list of Images objects to the ListImages property

    return productResponse;
  }

  async signup(product: Products): Promise<Products> {
    const users = await this.findOne(product.ID);
    product.CreatedAt = new Date();
    product.Status = true;
    if (users) {
      throw new ConflictException('ProductID already exists');
    } else {
      return await this.productRepo.save(product);
    }
  }

  //   async update(username: string, user: Users): Promise<UpdateResult> {
  //     return await this.usersRepo.update(user.username, user);
  //   }
  async update(
    ID: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    const product = await this.findOne(ID);
    const user = await this.usersService.findbyID(updateProductDto.UserID);
    const categogy = await this.categogyService.findOne(
      updateProductDto.CategoryID,
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (!user) {
      throw new NotFoundException('UserID not found');
    }
    if (!categogy) {
      throw new NotFoundException('CategogyID not found');
    }
    if (updateProductDto.Name) {
      product.Name = updateProductDto.Name;
    }
    if (updateProductDto.Description) {
      product.Description = updateProductDto.Description;
    }
    if (updateProductDto.Price) {
      product.Price = updateProductDto.Price;
    }
    if (updateProductDto.Quantity) {
      product.Quantity = updateProductDto.Quantity;
    }
    if (updateProductDto.Datemade) {
      product.Datemade = updateProductDto.Datemade;
    }
    // if (updateProductDto.CategoryID) {
    //   product.CategoryID = updateProductDto.CategoryID;
    // }
    // if (updateProductDto.UserID) {
    //   product.UserID = updateProductDto.UserID;
    // }
    if (updateProductDto.Status) {
      product.Status = Boolean(updateProductDto.Status);
    }

    return await this.productRepo.save(product);
  }

  async delete(ID: string): Promise<DeleteResult> {
    return await this.productRepo.delete({ ID: ID });
  }
}
