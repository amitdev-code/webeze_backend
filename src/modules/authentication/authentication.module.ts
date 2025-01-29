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
import { ConfigModule, ConfigService } from '@nestjs/config';

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

const IMPORT_MODULE = [
  UsersModule,
  CompanyModule,
  PassportModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.getOrThrow('auth.secret', {
        infer: true,
      }),
      signOptions: {
        expiresIn: configService.getOrThrow('auth.expires', {
          infer: true,
        }),
      },
    }),
    inject: [ConfigService],
  }),
];
@Module({
  controllers: [...CONSTROLLERS],
  providers: [...SERVICES],
  exports: [...SERVICES],
  imports: [...IMPORT_MODULE],
})
export class AuthenticationModule {}
