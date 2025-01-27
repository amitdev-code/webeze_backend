import { TokenPayload } from '@auth_modules/dto/tokenPayload.dto';
import { InvalidAuthTokenException } from '@exceptions/authenticationExceptions/InvalidAuthTokenException';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';


export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
@Injectable()
export class AuthenticationTokenService {
  private readonly JWT_SECRET_KEY: string;
  private readonly JWT_EXPIRY_TIME: string;
  private readonly JWT_REFRESH_SECRET_KEY: string;
  private readonly JWT_REFRESH_EXPIRY_TIME: string;
  constructor(private readonly configService: ConfigService) {
    const JWT_SECRET_KEY = this.configService.getOrThrow('auth.secret', {
      infer: true,
    });
    const JWT_EXPIRY_TIME = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });
    const JWT_REFRESH_SECRET_KEY = this.configService.getOrThrow('auth.secret', {
      infer: true,
    });
    const JWT_REFRESH_EXPIRY_TIME = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    this.JWT_SECRET_KEY = JWT_SECRET_KEY;
    this.JWT_EXPIRY_TIME = JWT_EXPIRY_TIME;
    this.JWT_REFRESH_SECRET_KEY = JWT_REFRESH_SECRET_KEY;
    this.JWT_REFRESH_EXPIRY_TIME = JWT_REFRESH_EXPIRY_TIME
  }

  async generateAuthenticationToken(tokenPayload: TokenPayload) {
    const accessToken = jwt.sign(
      {
        sub: tokenPayload.user_id,
        email: tokenPayload.email,
        role: tokenPayload.role,
        company: tokenPayload.company_id,
      },
      this.JWT_SECRET_KEY,
      { expiresIn: this.JWT_EXPIRY_TIME }
    );

    const refreshToken = jwt.sign(
      {
        sub: tokenPayload.user_id,
        email: tokenPayload.email,
        role: tokenPayload.role,
        company: tokenPayload.company_id,
      },
      this.JWT_REFRESH_SECRET_KEY,
      { expiresIn: this.JWT_REFRESH_EXPIRY_TIME }
    );

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      return jwt.verify(token, this.JWT_SECRET_KEY) as JwtPayload;
    } catch (error) {
      throw new InvalidAuthTokenException()
    }
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    try {
      return jwt.verify(token, this.JWT_REFRESH_SECRET_KEY) as JwtPayload;
    } catch (error) {
      throw new InvalidAuthTokenException()
    }
  }
}
