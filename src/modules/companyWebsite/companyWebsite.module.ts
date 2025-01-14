import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyWebsiteController } from './controller/companyWebsite.controller';
import { CompanyWebsiteService } from './providers/companyWebsite.service';
import { CompanyWebsiteEntity } from './entity/companyWebsite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyWebsiteEntity])],
  controllers: [CompanyWebsiteController],
  providers: [CompanyWebsiteService],
  exports: [CompanyWebsiteService],
})
export class CompanyWebsiteModule {}
