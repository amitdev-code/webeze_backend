import { LoginDto } from '@auth_modules/dto/login.dto';
import { RegisterDto } from '@auth_modules/dto/register.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  constructor() {}

  async register(registerUser: RegisterDto) {
    return registerUser;
  }

  async login(loginUser: LoginDto) {
    return loginUser;
  }
}
