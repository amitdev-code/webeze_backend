import { BaseEntity } from '@common/entity/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UsersEntity } from './user.entity';

@Entity('user_verification')
export class UserVerificationEntity extends BaseEntity {
  @ManyToOne(() => UsersEntity, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
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
