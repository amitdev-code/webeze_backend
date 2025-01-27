import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './providers/authentication.service';
import { AuthenticationTokenService } from './providers/authenticationToken.service';
import { AuthenticationVerificationController } from './controller/authenticationVerification.controller';
import { SocialAuthenticationService } from './providers/socialAuthentication.service';
import { UsersModule } from '@users_modules/users.module';
import { AuthenticationHelperService } from './providers/authenticationHelper';
import { CompanyModule } from '@company_modules/company.module';

const SERVICES = [
  AuthenticationService,
  AuthenticationTokenService,
  SocialAuthenticationService,
  AuthenticationHelperService,
];
const CONSTROLLERS = [
  AuthenticationController,
  AuthenticationVerificationController,
];

const IMPORT_MODULE = [UsersModule, CompanyModule];
@Module({
  controllers: [...CONSTROLLERS],
  providers: [...SERVICES],
  exports: [...SERVICES],
  imports: [...IMPORT_MODULE],
})
export class AuthenticationModule {}
