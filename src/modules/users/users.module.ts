import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/users.controller';
import { UsersService } from './providers/users.service';
import { UsersEntity } from './entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}