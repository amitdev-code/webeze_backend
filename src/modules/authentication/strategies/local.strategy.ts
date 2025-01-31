import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationHelperService } from '@auth_modules/providers/authenticationHelper';
import { WrongCredentialsException } from '@exceptions/authenticationExceptions/WrongCredentialsException';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationHelperService) {
    super({ usernameField: 'email' }); // Use 'email' as the field name
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUserLogin({ email, password });
    if (!user) throw new WrongCredentialsException();
    return user;
  }
}
