import { LoginDto } from '@auth_modules/dto/login.dto';
import { RegisterDto } from '@auth_modules/dto/register.dto';
import { CompanyHelperService } from '@company_modules/providers/companyHelper.service';
import { Injectable } from '@nestjs/common';
import { UserHelperService } from '@users_modules/providers/userHelper.service';
import { AuthenticationHelperService } from './authenticationHelper';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userhelperservice: UserHelperService,
    private readonly companyhelperservice: CompanyHelperService,
    private readonly authenticationhelperservice: AuthenticationHelperService,
    private readonly dataSource: DataSource,
  ) {}

  async register(
    registerUser: RegisterDto,
    ip: string,
    timezone: string,
    agent: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // VALIDATE USER REGISTRATION
      await this.authenticationhelperservice.validateUserRegistration(
        registerUser,
      );

      // CREATE USER
      const registeredUser = await this.userhelperservice.createUser(
        registerUser,
        ip,
        timezone,
        queryRunner,
      );

      // CREATE USER COMPANY
      const userCompany = await this.companyhelperservice.createCompany(
        registerUser.company_name,
        registeredUser,
        queryRunner,
      );

      // CREATE USER SESSION
      const userSession =
        await this.authenticationhelperservice.createUserNewSession(
          registeredUser,
          userCompany,
          ip,
          timezone,
          agent,
          queryRunner,
        );
      await queryRunner.commitTransaction();

      return {
        user: registeredUser,
        company: userCompany,
        session: userSession,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginUser: LoginDto) {
    return loginUser;
  }
}
