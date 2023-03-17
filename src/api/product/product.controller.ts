import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/enum/role/role.enum';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Products } from '../../entities/product.entity';
import { UpdateProductDto } from '../../dto/updateProductDto';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(
    private authService: AuthService,
    private readonly productService: ProductService,
  ) {}

  @Get('all')
  @ApiOkResponse({ description: 'List all product' })
  findAll(): Promise<Products[]> {
    return this.productService.findAll();
  }

  @Get('allwithImage/:ProductID')
  async findAllById(@Param('ProductID') ProductID: string) {
    return this.productService.findAllwithImage(ProductID);
  }

  @Post('create')
  create(@Body() products: Products) {
    return this.productService.signup(products);
  }

  @Put('update/:ID')
  async update(
    @Param('ID') ID: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    return this.productService.update(ID, updateProductDto);
  }

  @Delete('delete/:ID')
  deleteUser(@Param('ID') ID: string) {
    return this.productService.delete(ID);
  }
}
