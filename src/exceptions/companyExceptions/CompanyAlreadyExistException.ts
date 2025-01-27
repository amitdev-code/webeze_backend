import { ErrorMessages } from '@constants/errorMessages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyAlreadyExistException extends HttpException {
  constructor() {
    super(ErrorMessages.COMPANY_ALREADY_EXISTS, HttpStatus.CONFLICT);
  }
}
