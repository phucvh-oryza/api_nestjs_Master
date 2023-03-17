import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopMenus } from 'src/entities/topmenu.entity';
import { TopMenuService } from './topmenu.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopMenus])],
  providers: [TopMenuService],
  exports: [TopMenuService],
})
export class TopMenuModule {}
