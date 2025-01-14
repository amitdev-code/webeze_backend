import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './controller/company.controller';
import { CompanyService } from './providers/company.service';
import { CompanyEntity } from './entity/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}