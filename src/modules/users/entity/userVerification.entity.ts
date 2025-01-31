import { BaseEntity } from '@common/entity/baseEntity';
import { Column, Entity, JoinColumn } from 'typeorm';
import { UsersEntity } from './user.entity';

@Entity('user_verification')
export class UserVerificationEntity extends BaseEntity {
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column({ nullable: true })
  user_id: string;

  @Column({ default: '', length: 10 })
  verification_code: string;

  @Column({ default: null, length: 255, nullable: true })
  verification_token: string;

  @Column({ default: '', length: 10 })
  verification_type: string;
}
