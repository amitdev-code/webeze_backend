import { PlanType } from '@constants/plan-type';
import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';
@Entity('plans')
export class PlansEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, default: 'please describe the plan' })
  description: string;

  @Column({ type: 'bool', default: true })
  active: boolean;

  @Column({ type: 'int', default: 5 })
  templates: number;

  @Column({ type: 'int', default: 1000 })
  visits: number;

  @Column({ type: 'int', default: 5 })
  integrationAccount: number;

  @Column({ type: 'int', default: 2 })
  folders: number;

  @Column({ type: 'int', default: 1 })
  companies: number;

  @Column({
    type: 'enum',
    enum: PlanType,
    default: PlanType.DEFAULT,
  })
  plan_type: string;

  @Column({ type: 'int', default: 7 })
  plan_duration: number;

  @Column({ type: 'bool', default: true })
  is_subscribable: boolean;
}
