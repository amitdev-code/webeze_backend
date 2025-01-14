import { BaseEntity } from 'src/common/entity/baseEntity';
import { Entity } from 'typeorm';

@Entity('plans')
export class PlansEntity extends BaseEntity {}