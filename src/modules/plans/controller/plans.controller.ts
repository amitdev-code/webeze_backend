import { Controller } from '@nestjs/common';
import { PlansService } from '../providers/plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}
}
