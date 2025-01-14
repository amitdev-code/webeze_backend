import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlansEntity } from '../entity/plans.entity';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlansEntity)
    private readonly plansRepository: Repository<PlansEntity>,
  ) {}
}