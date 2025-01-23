import { AuthConfig } from '@auth_modules/config/auth.config.td';
import { DatabaseConfig } from 'src/database/config/database-config.td';
import { urlConfig } from 'src/env-config/url-config/url-config.td';

export type AllConfigType = {
  database: DatabaseConfig;
  url: urlConfig;
  auth: AuthConfig;
};
