import { instanceToPlain } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IBaseInterface } from './baseInterface';

export class BaseEntity implements IBaseInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value).toISOString(),
    },
  })
  created_at: Date;

  // Updated date in UTC
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value, // Store as is
      from: (value: string) => new Date(value).toISOString(),
    },
  })
  updated_at: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
