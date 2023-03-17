import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopMenuLV1s } from 'src/entities/topmenulv1.entity';
import { TopMenuLV1Service } from './topmenulv1.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopMenuLV1s])],
  providers: [TopMenuLV1Service],
  exports: [TopMenuLV1Service],
})
export class TopMenuLV1Module {}
