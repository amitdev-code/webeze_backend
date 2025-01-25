import { CompanyEntity } from '@company_modules/entity/company.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<CompanyEntity[]> {
    return await this.dataSource.getRepository(CompanyEntity).find();
  }

  async findOneById(id: string): Promise<CompanyEntity> {
    return await this.dataSource
      .getRepository(CompanyEntity)
      .findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<CompanyEntity | null> {
    return this.dataSource
      .getRepository(CompanyEntity)
      .createQueryBuilder('company')
      .where('company.name = :name', { name })
      .getOne();
  }
}
