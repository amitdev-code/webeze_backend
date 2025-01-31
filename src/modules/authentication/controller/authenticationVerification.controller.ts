import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../providers/authentication.service';
import { AuthenticationTokenService } from '../providers/authenticationToken.service';
import { SocialAuthenticationService } from '@auth_modules/providers/socialAuthentication.service';
// import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';

@Controller('auth-verification')
export class AuthenticationVerificationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly authenticationTokenService: AuthenticationTokenService,
    private readonly socialAuthenticationService: SocialAuthenticationService,
  ) {}

  @Post('verify-2fa')
  async verifyTwoFactorAuth(
    @Body() { token, code }: { token: string; code: string },
  ) {
    return await this.authenticationService.verifyTwoFactorAuth(token, code);
  }
}
