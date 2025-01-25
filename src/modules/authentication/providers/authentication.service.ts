import { LoginDto } from '@auth_modules/dto/login.dto';
import { RegisterDto } from '@auth_modules/dto/register.dto';
import { Injectable } from '@nestjs/common';
import { UserHelperService } from '@users_modules/providers/userHelper.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userhelperservice: UserHelperService) {}

  async register(registerUser: RegisterDto) {
    // VALIDATE USER EMAIL EXIST
    await this.userhelperservice.validateUserByEmailOrPhone({
      validate: 'email',
      email: registerUser.email,
    });
    // VALIDATE IF COMPANY EXIST WITH SAME NAME
  }

  async login(loginUser: LoginDto) {
    return loginUser;
  }
}
