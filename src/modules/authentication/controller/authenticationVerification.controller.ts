import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../providers/authentication.service';
import { AuthenticationTokenService } from '../providers/authenticationToken.service';
import { SocialAuthenticationService } from '@auth_modules/providers/socialAuthentication.service';
import { GetCurrentUser } from '@decorators/getCurrentUser.decorator';
import { UsersEntity } from '@users_modules/entity/user.entity';
import { AuthenticationHelperService } from '@auth_modules/providers/authenticationHelper';
// import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';

@Controller('auth-verification')
export class AuthenticationVerificationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly authenticationhelperservice: AuthenticationHelperService,
    private readonly authenticationTokenService: AuthenticationTokenService,
    private readonly socialAuthenticationService: SocialAuthenticationService,
  ) {}

  @Post('2fa')
  async TwoFactorAuth(@GetCurrentUser() user: UsersEntity) {
    return await this.authenticationhelperservice.createUserVerificationToken(
      user,
    );
  }

  @Post('verify-2fa')
  async verifyTwoFactorAuth(
    @Body() { token, code }: { token: string; code: string },
  ) {
    return await this.authenticationService.verifyTwoFactorAuth(token, code);
  }
}
