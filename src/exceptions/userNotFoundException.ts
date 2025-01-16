import { ErrorMessages } from '@constants/errorMessages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(ErrorMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
