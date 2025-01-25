import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './providers/authentication.service';
import { AuthenticationTokenService } from './providers/authenticationToken.service';
import { AuthenticationVerificationController } from './controller/authenticationVerification.controller';
import { SocialAuthenticationService } from './providers/socialAuthentication.service';
import { UsersModule } from '@users_modules/users.module';

const SERVICES = [
  AuthenticationService,
  AuthenticationTokenService,
  SocialAuthenticationService,
];
const CONSTROLLERS = [
  AuthenticationController,
  AuthenticationVerificationController,
];
@Module({
  controllers: [...CONSTROLLERS],
  providers: [...SERVICES],
  exports: [...SERVICES],
  imports: [UsersModule],
})
export class AuthenticationModule {}
