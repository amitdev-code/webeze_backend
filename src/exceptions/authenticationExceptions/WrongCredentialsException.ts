import { ErrorMessages } from '@constants/errorMessages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongCredentialsException extends HttpException {
  constructor() {
    super(ErrorMessages.WRONG_CREDENTIALS, HttpStatus.UNAUTHORIZED);
  }
}
