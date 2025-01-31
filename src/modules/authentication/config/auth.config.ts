import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import { AuthConfig } from './auth.config.td';
import validateConfig from 'src/common/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  JWT_SECRET_KEY: string;

  @IsOptional()
  @IsString()
  JWT_EXPIRY_TIME: string;

  @IsString()
  JWT_REFRESH_SECRET_KEY: string;

  @IsOptional()
  @IsString()
  JWT_REFRESH_EXPIRY_TIME: string;

  @IsOptional()
  @IsString()
  JWT_REFRESH_REMEMBER_ME_EXPIRY_TIME: string;

  @IsOptional()
  @IsString()
  DATABASE_ENCRYPTION_KEY: string;

  @IsOptional()
  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsOptional()
  @IsString()
  GOOGLE_CLIENT_SECRET: string;
}

export default registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    secret: process.env.JWT_SECRET_KEY,
    expires: process.env.JWT_EXPIRY_TIME || '1h',
    refreshSecret: process.env.JWT_REFRESH_SECRET_KEY,
    refreshExpires: process.env.JWT_REFRESH_EXPIRY_TIME || '1d',
    refreshRememberMeExpires:
      process.env.JWT_REFRESH_REMEMBER_ME_EXPIRY_TIME || '30d',
    dbEncryptionKey: process.env.DATABASE_ENCRYPTION_KEY,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    jwtVerificationSecret: process.env.JWT_VERIFICATION_SECRET_KEY,
    jwtVerificationExpires: process.env.JWT_VERIFICATION_EXPIRY_TIME,
  };
});
