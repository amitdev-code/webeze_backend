import { ErrorMessages } from '@constants/errorMessages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class PhoneAlredyExistException extends HttpException {
  constructor() {
    super(ErrorMessages.USER_PHONE_ALREADY_EXISTS, HttpStatus.CONFLICT);
  }
}
