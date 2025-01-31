import { Injectable } from '@nestjs/common';
import { CompanyHelperService } from '@company_modules/providers/companyHelper.service';
import { UserHelperService } from '@users_modules/providers/userHelper.service';
import { LoginDto } from '@auth_modules/dto/login.dto';
import { UsersService } from '@users_modules/providers/users.service';
import { WrongCredentialsException } from '@exceptions/authenticationExceptions/WrongCredentialsException';
import * as bcrypt from 'bcrypt';
import { AuthenticationTokenService } from './authenticationToken.service';
import { UsersEntity } from '@users_modules/entity/user.entity';
import { CompanyEntity } from '@company_modules/entity/company.entity';
import { RegisterDto } from '@auth_modules/dto/register.dto';
import { QueryRunner } from 'typeorm';
import { GeneralHelperFunctions } from '@common/helper/generalHelperFunctions';

@Injectable()
export class AuthenticationHelperService {
  constructor(
    private readonly userhelperservice: UserHelperService,
    private readonly userservice: UsersService,
    private readonly companyhelperservice: CompanyHelperService,
    private readonly authtokenservice: AuthenticationTokenService,
  ) {}

  async validateUserRegistration(registerUser: RegisterDto) {
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

  async createUserNewSession(
    user: UsersEntity,
    company: CompanyEntity,
    ip: string,
    timezone: string,
    agent: string,
    queryRunner: QueryRunner,
  ) {
    const authTokens = await this.authtokenservice.generateAuthenticationToken({
      user_id: user.id,
      email: user.useremail.email,
      role: user.role,
      company_id: company.id,
    });
    const session = await this.userhelperservice.createUserSession(
      {
        user_id: user.id,
        sessionToken: authTokens.accessToken,
        refreshToken: authTokens.refreshToken,
        ip,
        user_agent: JSON.parse(agent),
      },
      queryRunner,
    );
    return session;
  }

  async updateUserSession(
    user: UsersEntity,
    company: CompanyEntity,
    ip: string,
    timezone: string,
    agent: string,
  ) {
    const authTokens = await this.authtokenservice.generateAuthenticationToken({
      user_id: user.id,
      email: user.useremail.email,
      role: user.role,
      company_id: company.id,
    });
    const session = await this.userhelperservice.updateUserAuthToken({
      user_id: user.id,
      sessionToken: authTokens.accessToken,
      refreshToken: authTokens.refreshToken,
      ip,
      user_agent: JSON.parse(agent),
    });
    return session;
  }

  async createUserVerificationToken(user: UsersEntity) {
    const verificationToken =
      await this.authtokenservice.generateVerificationToken(user.id);
    const OTP = GeneralHelperFunctions.generateSixDigitOTP();
    await this.userhelperservice.createUserVerificationToken(
      user,
      verificationToken,
      OTP,
    );
    return {
      verificationToken,
    };
  }
}
