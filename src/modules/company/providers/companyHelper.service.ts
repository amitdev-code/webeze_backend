import { Injectable } from '@nestjs/common';
import { CompanyService } from './company.service';

@Injectable()
export class CompanyHelperService {
  constructor(private readonly companyservice: CompanyService) {}

  async validateCompanyByName(name: string) {
    const company = await this.companyservice.findOneByName(name);
    if (company) {
      throw new Error('Company with the same name already exists.');
    }
  }
}
