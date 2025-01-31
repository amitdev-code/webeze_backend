import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansController } from './controller/plans.controller';
import { PlansService } from './providers/plans.service';
import { PlansEntity } from './entity/plans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlansEntity])],
  controllers: [PlansController],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}
