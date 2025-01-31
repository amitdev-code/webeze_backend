import { BaseEntity } from 'src/common/entity/baseEntity';
import { Entity } from 'typeorm';

@Entity('payments')
export class PaymentsEntity extends BaseEntity {}
