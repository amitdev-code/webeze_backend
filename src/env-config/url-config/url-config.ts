import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import validateConfig from 'src/common/utils/validate-config';
import { urlConfig } from './url-config.td';

class EnvironmentVariablesValidator {
  @IsString()
  FRONTEND_URL: string;

  @IsString()
  BACKEND_URL: string;
}

export default registerAs<urlConfig>('url', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    frontendUrl: process.env.FRONTEND_URL,
    backendUrl: process.env.BACKEND_URL,
  };
});
