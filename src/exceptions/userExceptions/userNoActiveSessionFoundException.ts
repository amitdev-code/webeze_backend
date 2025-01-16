import { ErrorMessages } from '@constants/errorMessages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class userNoActiveSessionFoundException extends HttpException {
  constructor() {
    super(ErrorMessages.USER_NO_ACTIVE_SESSION_FOUND, HttpStatus.NOT_FOUND);
  }
}
