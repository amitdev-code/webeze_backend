import { TokenPayload } from '@auth_modules/dto/tokenPayload.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserHelperService } from '@users_modules/providers/userHelper.service';
import * as bcrypt from 'bcrypt';

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
  private readonly JWT_VERIFICATION_SECRET_KEY: string;
  private readonly JWT_VERIFICATION_EXPIRY_TIME: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly userhelperservice: UserHelperService,
    private jwtService: JwtService,
  ) {
    const JWT_SECRET_KEY = this.configService.getOrThrow('auth.secret', {
      infer: true,
    });
    const JWT_EXPIRY_TIME = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });
    const JWT_REFRESH_SECRET_KEY = this.configService.getOrThrow(
      'auth.secret',
      {
        infer: true,
      },
    );
    const JWT_REFRESH_EXPIRY_TIME = this.configService.getOrThrow(
      'auth.expires',
      {
        infer: true,
      },
    );

    const JWT_VERIFICATION_SECRET_KEY = this.configService.getOrThrow(
      'auth.jwtVerificationSecret',
      {
        infer: true,
      },
    );
    const JWT_VERIFICATION_EXPIRY_TIME = this.configService.getOrThrow(
      'auth.jwtVerificationExpires',
      {
        infer: true,
      },
    );

    this.JWT_VERIFICATION_SECRET_KEY = JWT_VERIFICATION_SECRET_KEY;
    this.JWT_VERIFICATION_EXPIRY_TIME = JWT_VERIFICATION_EXPIRY_TIME;
    this.JWT_SECRET_KEY = JWT_SECRET_KEY;
    this.JWT_EXPIRY_TIME = JWT_EXPIRY_TIME;
    this.JWT_REFRESH_SECRET_KEY = JWT_REFRESH_SECRET_KEY;
    this.JWT_REFRESH_EXPIRY_TIME = JWT_REFRESH_EXPIRY_TIME;
  }

  async generateAuthenticationToken(tokenPayload: TokenPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: tokenPayload.user_id,
          email: tokenPayload.email,
          role: tokenPayload.role,
          company: tokenPayload.company_id,
        },
        {
          secret: this.JWT_SECRET_KEY,
          expiresIn: this.JWT_EXPIRY_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: tokenPayload.user_id,
          email: tokenPayload.email,
          role: tokenPayload.role,
          company: tokenPayload.company_id,
        },
        {
          secret: this.JWT_REFRESH_SECRET_KEY,
          expiresIn: this.JWT_REFRESH_EXPIRY_TIME,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateVerificationToken(user_id: string) {
    const verificationToken = await this.jwtService.signAsync(
      {
        sub: user_id,
      },
      {
        secret: this.JWT_VERIFICATION_SECRET_KEY,
        expiresIn: this.JWT_VERIFICATION_EXPIRY_TIME,
      },
    );

    return verificationToken;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    if (refreshToken) {
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      await this.userhelperservice.updateUserRefreshToken(
        userId,
        hashedRefreshToken,
      );
    } else {
      await this.userhelperservice.updateUserRefreshToken(userId, null);
    }
  }

  async decodeVerificationToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.JWT_VERIFICATION_SECRET_KEY,
    });
  }
}
