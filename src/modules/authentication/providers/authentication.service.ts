import { LoginDto } from '@auth_modules/dto/login.dto';
import { RegisterDto } from '@auth_modules/dto/register.dto';
import { CompanyHelperService } from '@company_modules/providers/companyHelper.service';
import { Injectable } from '@nestjs/common';
import { UserHelperService } from '@users_modules/providers/userHelper.service';
import { AuthenticationHelperService } from './authenticationHelper';
import { AuthenticationTokenService } from './authenticationToken.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userhelperservice: UserHelperService,
    private readonly companyhelperservice: CompanyHelperService,
    private readonly authenticationhelperservice: AuthenticationHelperService,
    private readonly authenticationtokenservice: AuthenticationTokenService,
  ) {}

  async register(registerUser: RegisterDto, ip: string, timezone: string) {
    // VALIDATE USER REGISTRATION
    await this.authenticationhelperservice.validateUserRegistration(
      registerUser,
    );
    // CREATE USER
    const registeredUser = await this.userhelperservice.createUser(
      registerUser,
      ip,
      timezone,
    );
    // CREATE USER COMPANY
    await this.companyhelperservice.createCompany(
      registerUser.company_name,
      registeredUser,
    );
    // return this.authenticationtokenservice.generateAuthenticationToken();
  }

  async login(loginUser: LoginDto) {
    return loginUser;
  }
}
