import { Injectable } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyAlreadyExistException } from '@exceptions/companyExceptions/CompanyAlreadyExistException';
import { UsersEntity } from '@users_modules/entity/user.entity';
import { CompanyEntity } from '@company_modules/entity/company.entity';

@Injectable()
export class CompanyHelperService {
  constructor(private readonly companyservice: CompanyService) {}

  async validateCompanyByName(name: string) {
    const company = await this.companyservice.findOneByName(name);
    if (company) {
      new CompanyAlreadyExistException();
    }
  }

  async createCompany(
    name: string,
    registeredUser: UsersEntity,
  ): Promise<CompanyEntity> {
    const company = new CompanyEntity();
    company.name = name;
    company.sub_domain = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    company.user_id = registeredUser.id;
    const newCompany = await this.companyservice.createCompany(company);
    // CRAETE COMPANY SETTINGS
    await this.companyservice.createCompanySettings(newCompany);
    return newCompany;
  }
}
