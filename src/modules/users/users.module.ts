import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/users.controller';
import { UsersEntity } from './entity/user.entity';
import { UsersService } from './providers/users.service';
import { UserSessionService } from './providers/userSession.service';
import { UserHelperService } from './providers/userHelper.service';

const SERVICES = [UsersService, UserSessionService, UserHelperService];
@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class UsersModule {}
