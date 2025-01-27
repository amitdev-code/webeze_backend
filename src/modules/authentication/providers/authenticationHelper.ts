import { Injectable } from '@nestjs/common';
import { CompanyHelperService } from '@company_modules/providers/companyHelper.service';
import { UserHelperService } from '@users_modules/providers/userHelper.service';

@Injectable()
export class AuthenticationHelperService {
  constructor(
    private readonly userhelperservice: UserHelperService,
    private readonly companyhelperservice: CompanyHelperService,
  ) {}

  async validateUserRegistration(registerUser: any) {
    try {
      // VALIDATE USER EMAIL EXIST
      await this.userhelperservice.validateUserByEmailOrPhone({
        validate: 'email',
        email: registerUser.email,
      });

      // VALIDATE IF COMPANY EXIST WITH SAME NAME
      await this.companyhelperservice.validateCompanyByName(
        registerUser.company_name,
      );
    } catch (error) {
      throw error;
    }
  }
}
