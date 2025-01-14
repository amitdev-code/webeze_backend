import { Module } from '@nestjs/common';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './providers/authentication.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
