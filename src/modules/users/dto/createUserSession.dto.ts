import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserSessionDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  sessionToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsString()
  @IsNotEmpty()
  browser: string;

  userAgent: {
    version: string;
    os: string;
    platform: string;
    source: string;
  };
}
