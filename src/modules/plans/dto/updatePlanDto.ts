import { PartialType } from '@nestjs/swagger';
import { CreatePlanDto } from './createPlanDto';

export class UpdatePlanDto extends PartialType(CreatePlanDto) {}
