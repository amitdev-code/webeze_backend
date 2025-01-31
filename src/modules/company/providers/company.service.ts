import { CompanyEntity } from '@company_modules/entity/company.entity';
import { CompanySettingsEntity } from '@company_modules/entity/companySettings.entity';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';

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

  async findOneByUserId(id: string): Promise<CompanyEntity> {
    return await this.dataSource.getRepository(CompanyEntity).findOne({
      where: { user_id: id },
      relations: ['settings'],
    });
  }

  async findOneByName(name: string): Promise<CompanyEntity | null> {
    return this.dataSource
      .getRepository(CompanyEntity)
      .createQueryBuilder('company')
      .where('company.name = :name', { name })
      .getOne();
  }

  async createCompany(
    company: CompanyEntity,
    queryRunner: QueryRunner,
  ): Promise<CompanyEntity> {
    return await queryRunner.manager.save(company);
  }

  async createCompanySettings(
    company: CompanyEntity,
    queryRunner: QueryRunner,
  ): Promise<CompanySettingsEntity> {
    const companySettings = new CompanySettingsEntity();
    companySettings.company_id = company.id;
    return await queryRunner.manager.save(companySettings);
  }
}
