import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationHelperService } from '@auth_modules/providers/authenticationHelper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authHelperService: AuthenticationHelperService) {
        super();
    }

    validate(username: string, password: string) {
        const user = this.authHelperService.validateUserLogin({ username, password });
        if (!user) throw new UnauthorizedException();
        return user;
    }
}