import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesController } from './controller/templates.controller';
import { TemplatesService } from './providers/templates.service';
import { TemplatesEntity } from './entity/templates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplatesEntity])],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
