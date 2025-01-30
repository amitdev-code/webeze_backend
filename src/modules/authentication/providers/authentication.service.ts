import { LoginDto } from '@auth_modules/dto/login.dto';
import { RegisterDto } from '@auth_modules/dto/register.dto';
import { CompanyHelperService } from '@company_modules/providers/companyHelper.service';
import { Injectable } from '@nestjs/common';
import { UserHelperService } from '@users_modules/providers/userHelper.service';
import { AuthenticationHelperService } from './authenticationHelper';
import { AuthenticationTokenService } from './authenticationToken.service';
import { DataSource } from 'typeorm';
import { UsersService } from '@users_modules/providers/users.service';
import { CompanyService } from '@company_modules/providers/company.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userhelperservice: UserHelperService,
    private readonly userservice: UsersService,
    private readonly companyhelperservice: CompanyHelperService,
    private readonly companyservice: CompanyService,
    private readonly authenticationhelperservice: AuthenticationHelperService,
    private readonly dataSource: DataSource,
  ) { }

  async register(registerUser: RegisterDto, ip: string, timezone: string, agent: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // VALIDATE USER REGISTRATION
      await this.authenticationhelperservice.validateUserRegistration(registerUser);

      // CREATE USER
      const registeredUser = await this.userhelperservice.createUser(registerUser, ip, timezone);

      // CREATE USER COMPANY
      const userCompany = await this.companyhelperservice.createCompany(registerUser.company_name, registeredUser);

      // CREATE USER SESSION
      const userSession = await this.authenticationhelperservice.createUserNewSession(registeredUser, userCompany, ip, timezone, agent);

      // COMMIT TRANSACTION
      await queryRunner.commitTransaction();

      return {
        user: registeredUser,
        company: userCompany,
        session: userSession,
      };
    } catch (error) {
      // ROLLBACK TRANSACTION
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // RELEASE QUERY RUNNER
      await queryRunner.release();
    }
  }

  async login(loginDto: LoginDto, ip: string, timezone: string, agent: string) {

    const user = await this.userservice.findOneByEmail(loginDto.email);
    const userCompany = await this.companyservice.findOneByUserId(user.id);

    // CREATE USER SESSION
    const userSession = await this.authenticationhelperservice.createUserNewSession(user, userCompany, ip, timezone, agent);

    return {
      user: user,
      company: userCompany,
      session: userSession,
    };
  }
}
