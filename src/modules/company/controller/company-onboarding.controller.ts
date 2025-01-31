import { Controller } from '@nestjs/common';
import { CompanyService } from '../providers/company.service';

@Controller('company-onboarding')
export class CompanyOnboardingController {
  constructor(private readonly companyService: CompanyService) {}
}
