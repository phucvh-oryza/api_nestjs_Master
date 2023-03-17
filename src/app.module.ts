import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './api/users/users.controller';
import { UsersModule } from './api/users/users.module';
import { ImageModule } from './api/image/image.module';
import { ImageController } from './api/image/image.controller';
import { CategogyModule } from './api/categogy/categogy.module';
import { CategogyController } from './api/categogy/categogy.controller';
import { ProductModule } from './api/product/product.module';
import { ProductController } from './api/product/product.controller';
import { RoleModule } from './api/role/role.module';
import { RoleController } from './api/role/role.controller';
import { TopMenuModule } from './api/menu/topmenu/topmenu.module';
import { TopMenuController } from './api/menu/topmenu/topmenu.controller';
import { TopMenuLV1Module } from './api/menu/topmenuLV1/topmenulv1.module';
import { TopMenuLV1Controller } from './api/menu/topmenuLV1/topmenulv1.controller';
import { TopMenuLV2Module } from './api/menu/topmenuLV2/topmenulv2.module';
import { TopMenuLV2Controller } from './api/menu/topmenuLV2/topmenulv2.controller';
import { GLOBAL } from './util/variable';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: GLOBAL.G_DB_HOST,
      port: GLOBAL.G_DB_PORT,
      username: GLOBAL.G_DB_USERNAME,
      password: GLOBAL.G_DB_PASSWORD,
      database: GLOBAL.G_DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      options: { encrypt: false },
    }),
    AuthModule,
    UsersModule,
    ImageModule,
    CategogyModule,
    ProductModule,
    RoleModule,
    TopMenuModule,
    TopMenuLV1Module,
    TopMenuLV2Module,
  ],
  controllers: [
    UsersController,
    ImageController,
    CategogyController,
    ProductController,
    RoleController,
    TopMenuController,
    TopMenuLV1Controller,
    TopMenuLV2Controller,
  ],
})
export class AppModule {}
