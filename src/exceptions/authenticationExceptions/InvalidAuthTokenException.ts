import { ErrorMessages } from '@constants/errorMessages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAuthTokenException extends HttpException {
  constructor() {
    super(ErrorMessages.INVALID_ACCESS_TOKEN, HttpStatus.UNAUTHORIZED);
  }
}
