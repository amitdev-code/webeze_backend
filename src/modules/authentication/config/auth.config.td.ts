export type AuthConfig = {
  secret: string;
  expires: string;
  refreshSecret: string;
  refreshExpires: string;
  refreshRememberMeExpires: string;
  jwtVerificationSecret: string;
  jwtVerificationExpires: string;
  dbEncryptionKey: string;
  googleClientId: string;
  googleClientSecret: string;
};
