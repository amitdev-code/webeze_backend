import { Controller } from '@nestjs/common';
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

  //   @UseGuards(JwtRefreshGuard)
  //   @Post('refresh-token')
  //   async refreshToken(@Req() req) {
  //     const { refreshToken } = req.user;
  //     return this.authenticationService.refreshToken(refreshToken);
  //   }

  //   @Post('verify-2fa')
  //   async verifyTwoFactorAuth(
  //     @Body() { userId, code }: { userId: string; code: string },
  //   ) {
  //     return this.authenticationService.verifyTwoFactorAuth(userId, code);
  //   }
}
