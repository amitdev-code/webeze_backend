import { BaseEntity } from '@common/entity/baseEntity';
import { SessionStatus } from '@constants/session-type';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { UsersEntity } from './user.entity';

interface UserAgent {
  version: string;
  os: string;
  platform: string;
  source: string;
}

@Entity('user_session')
@Index(['user', 'status'])
export class UserSession extends BaseEntity {
  @ManyToOne(() => UsersEntity, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  user: UsersEntity;

  @Column()
  user_id: string;

  @Column({ default: '', length: 100 })
  ip: string;

  @Column({ default: '', length: 100 })
  browser: string;

  @Column({ type: 'jsonb' })
  session_token: {
    token: string;
    expiry: Date;
  };

  @Column({ type: 'jsonb' })
  refresh_token: {
    token: string;
    expiry: Date;
  };

  @Column('jsonb', {
    default: {
      version: '',
      os: '',
      platform: '',
      source: '',
    },
  })
  userAgent: UserAgent;

  @Column({
    type: 'enum',
    enum: SessionStatus,
    default: SessionStatus.ACTIVE,
  })
  status: SessionStatus;

  // Helper method to deactivate session
  deactivate() {
    this.status = SessionStatus.INACTIVE;
  }
}
