import { ErrorMessages } from '@constants/errorMessages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidVerificationCodeException extends HttpException {
  constructor() {
    super(ErrorMessages.INVALID_AUTHERIZATION_CODE, HttpStatus.CONFLICT);
  }
}
