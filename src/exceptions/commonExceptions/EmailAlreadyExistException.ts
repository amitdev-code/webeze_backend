import { ErrorMessages } from '@constants/errorMessages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistException extends HttpException {
  constructor() {
    super(ErrorMessages.USER_EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT);
  }
}
