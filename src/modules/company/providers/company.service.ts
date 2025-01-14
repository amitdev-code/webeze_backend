import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entity/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}
}