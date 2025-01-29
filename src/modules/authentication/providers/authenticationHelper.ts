import { Injectable } from '@nestjs/common';
import { CompanyHelperService } from '@company_modules/providers/companyHelper.service';
import { UserHelperService } from '@users_modules/providers/userHelper.service';
import { LoginDto } from '@auth_modules/dto/login.dto';
import { UsersService } from '@users_modules/providers/users.service';
import { WrongCredentialsException } from '@exceptions/authenticationExceptions/WrongCredentialsException';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationHelperService {
  constructor(
    private readonly userhelperservice: UserHelperService,
    private readonly userservice: UsersService,
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

  async validateUserLogin(logindto: LoginDto) {
    // EMAIL VALIDATION
    const userDetail = await this.userservice.findOneByEmail(logindto.email);
    if (!userDetail) {
      throw new WrongCredentialsException();
    }
    // PASSWORD VALIDATION
    if (await bcrypt.compare(logindto.password, userDetail.password)) {
      return userDetail;
    } else {
      throw new WrongCredentialsException();
    }
  }
}
