import { BaseEntity } from 'src/common/entity/baseEntity';
import { Entity } from 'typeorm';

@Entity('company_settings')
export class CompanySettingsEntity extends BaseEntity {}
