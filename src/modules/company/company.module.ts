import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './controller/company.controller';
import { CompanyService } from './providers/company.service';
import { CompanyEntity } from './entity/company.entity';
import { CompanyHelperService } from './providers/companyHelper.service';

const SERVICES = [CompanyService, CompanyHelperService];
@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class CompanyModule {}
