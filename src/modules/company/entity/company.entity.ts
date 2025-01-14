import { BaseEntity } from 'src/common/entity/baseEntity';
import { Entity } from 'typeorm';

@Entity('company')
export class CompanyEntity extends BaseEntity {}
