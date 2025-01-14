import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyWebsiteEntity } from '../entity/companyWebsite.entity';

@Injectable()
export class CompanyWebsiteService {
  constructor(
    @InjectRepository(CompanyWebsiteEntity)
    private readonly companywebsiteRepository: Repository<CompanyWebsiteEntity>,
  ) {}
}
