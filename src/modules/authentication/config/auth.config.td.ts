export type AuthConfig = {
  secret: string;
  expires: string;
  refreshSecret: string;
  refreshExpires: string;
  refreshRememberMeExpires: string;
  dbEncryptionKey: string;
  googleClientId: string;
  googleClientSecret: string;
};
