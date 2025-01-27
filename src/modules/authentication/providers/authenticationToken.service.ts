import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationTokenService {
  constructor(private readonly configService: ConfigService) {}

  async generateAuthenticationToken() {
    const JWT_SECRET_KEY = this.configService.getOrThrow('auth.secret', {
      infer: true,
    });
    const JWT_EXPIRY_TIME = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    return {
      JWT_SECRET_KEY,
      JWT_EXPIRY_TIME,
    };
  }
}
