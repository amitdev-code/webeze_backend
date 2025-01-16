import { RoleType } from '@constants/role-type';
export interface JwtPayload {
  sub: string;
  email: string;
  role: RoleType;
}
