import { Controller } from '@nestjs/common';
import { AuthenticationService } from '../providers/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
}
