import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../providers/authentication.service';
import { RegisterDto } from '@auth_modules/dto/register.dto';
import { LoginDto } from '@auth_modules/dto/login.dto';
import { AuthenticationTokenService } from '@auth_modules/providers/authenticationToken.service';
import { SocialAuthenticationService } from '@auth_modules/providers/socialAuthentication.service';
import { CurrentUserIp } from '@decorators/getUserIp.decorator';
import { CurrentUserTimezone } from '@decorators/getUserTimezone.decorator';
// import { RegisterDto } from '@auth_modules/dto/register.dto';
// import { LoginDto } from '@auth_modules/dto/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly authenticationTokenService: AuthenticationTokenService,
    private readonly socialAuthenticationService: SocialAuthenticationService,
  ) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @CurrentUserIp() ip: string,
    @CurrentUserTimezone() timezone: string,
  ) {
    return this.authenticationService.register(registerDto, ip, timezone);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto);
  }

  // @Post('google')
  // async googleAuth(@Body() { token }: { token: string }) {
  //   return this.authenticationService.googleAuth(token);
  // }

  // @Post('facebook')
  // async facebookAuth(@Body() { token }: { token: string }) {
  //   return this.authenticationService.facebookAuth(token);
  // }
}
