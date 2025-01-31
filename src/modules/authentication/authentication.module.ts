import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './providers/authentication.service';
import { AuthenticationTokenService } from './providers/authenticationToken.service';
import { AuthenticationVerificationController } from './controller/authenticationVerification.controller';
import { SocialAuthenticationService } from './providers/socialAuthentication.service';
import { UsersModule } from '@users_modules/users.module';
import { AuthenticationHelperService } from './providers/authenticationHelper';
import { CompanyModule } from '@company_modules/company.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalAuthGuard } from '@guards/local-auth.guard';
import { GoogleAuthGuard } from '@guards/google-auth.guard';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

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

const PROVIDERS = [
  LocalStrategy,
  GoogleStrategy,
  LocalAuthGuard,
  GoogleAuthGuard,
  JwtAuthGuard,
];

const IMPORT_MODULE = [UsersModule, CompanyModule, PassportModule];
@Module({
  controllers: [...CONSTROLLERS],
  providers: [...SERVICES, ...PROVIDERS],
  exports: [...SERVICES],
  imports: [
    ...IMPORT_MODULE,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRY_TIME },
    }),
  ],
})
export class AuthenticationModule {}
