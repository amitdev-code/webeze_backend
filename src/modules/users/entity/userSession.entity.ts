import { BaseEntity } from '@common/entity/baseEntity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { UsersEntity } from './user.entity';

interface UserAgent {
  version: string;
  os: string;
  platform: string;
  source: string;
  browser: string;
}

@Entity('user_session')
@Index(['user'])
export class UserSession extends BaseEntity {
  @ManyToOne(() => UsersEntity, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column({ nullable: true })
  user_id: string;

  @Column({ default: '', length: 100 })
  ip: string;

  @Column({ type: 'jsonb' })
  session_token: {
    token: string;
    expiry: string;
  };

  @Column({ type: 'jsonb' })
  refresh_token: {
    token: string;
    expiry: string;
  };

  @Column('jsonb', {
    default: {
      version: '',
      os: '',
      platform: '',
      source: '',
      browser: '',
    },
    nullable: false,
  })
  user_agent: UserAgent;
}
