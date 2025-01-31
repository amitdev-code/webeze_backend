import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './controller/company.controller';
import { CompanyService } from './providers/company.service';
import { CompanyEntity } from './entity/company.entity';
import { CompanyHelperService } from './providers/companyHelper.service';
import { CompanyOnboardingController } from './controller/company-onboarding.controller';
import { CompanyOnboardingService } from './providers/companyOnboarding.service';

const SERVICES = [
  CompanyService,
  CompanyHelperService,
  CompanyOnboardingService,
];
const CONTROLLERS = [CompanyController, CompanyOnboardingController];
@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class CompanyModule {}
