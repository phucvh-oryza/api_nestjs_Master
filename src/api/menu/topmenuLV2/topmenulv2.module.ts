import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopMenuLV2s } from 'src/entities/topmenulv2.entity';
import { TopMenuLV2Service } from './topmenulv2.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopMenuLV2s])],
  providers: [TopMenuLV2Service],
  exports: [TopMenuLV2Service],
})
export class TopMenuLV2Module {}
