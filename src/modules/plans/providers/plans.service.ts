import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlansEntity } from '../entity/plans.entity';
import { UpdatePlanDto } from '@plans_modules/dto/updatePlanDto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlansEntity)
    private readonly plansRepository: Repository<PlansEntity>,
  ) {}

  async getPlanById(id: string): Promise<PlansEntity> {
    return this.plansRepository.findOne({ where: { id } });
  }

  async addPlan(plan: PlansEntity): Promise<PlansEntity> {
    return this.plansRepository.save(plan);
  }

  async editPlan(id: string, plan: UpdatePlanDto): Promise<PlansEntity> {
    await this.plansRepository.update(id, plan);
    return this.plansRepository.findOne({ where: { id } });
  }

  async deletePlan(id: string): Promise<void> {
    await this.plansRepository.delete(id);
  }
}
