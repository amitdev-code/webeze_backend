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

  user_agent: {
    version: string;
    os: string;
    platform: string;
    source: string;
    browser: string;
  };
}
