import { Controller } from '@nestjs/common';
import { CompanyWebsiteService } from '../providers/companyWebsite.service';

@Controller('company_website')
export class CompanyWebsiteController {
  constructor(private readonly companywebsiteService: CompanyWebsiteService) {}
}
