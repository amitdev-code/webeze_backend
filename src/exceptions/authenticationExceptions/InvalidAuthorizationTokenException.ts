import { ErrorMessages } from '@constants/errorMessages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAuthorizationTokenException extends HttpException {
  constructor() {
    super(ErrorMessages.INVALID_AUTHERIZATION_TOKEN, HttpStatus.UNAUTHORIZED);
  }
}
