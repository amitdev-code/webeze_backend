import { RoleType } from '@constants/role-type';
import { SessionStatus } from '@constants/session-type';
import { Column, Entity, OneToMany } from 'typeorm';
import { IUser } from './interfaces/user.interface';
import { UserSession } from './userSession.entity';
import { BaseEntity } from '@common/entity/baseEntity';

@Entity('user')
export class UsersEntity extends BaseEntity implements IUser {
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'jsonb' })
  useremail: {
    email: string;
    is_verified: boolean;
    is_primary: boolean;
    webeze_newsletter: boolean;
  };

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: string;

  @Column({
    type: 'jsonb',
    default: {
      active: false,
      platform: {
        facebook: false,
        google: false,
      },
    },
  })
  social_login: {
    active: boolean;
    platform: {
      facebook: boolean;
      google: boolean;
    };
  };

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'varchar', length: 255 })
  last_location: string;

  @Column({ type: 'timestamp' })
  last_login: Date;

  @Column({ type: 'varchar', length: 255 })
  timezone: string;

  @Column({ type: 'bool', default: true })
  active: boolean;

  @Column({ type: 'jsonb', default: [] })
  trusted_ip_address: [
    {
      ip: string;
      trusted: boolean;
    },
  ];

  @Column({ type: 'int', default: 0 })
  session_count: number;

  @Column({ type: 'jsonb', default: { is_configured: false } })
  two_fact_auth: {
    is_configured: boolean;
    created_at: Date;
    secret: {
      ascii: string;
      hex: string;
      base32: string;
      otpauth_url: string;
    };
    recovery_codes: [
      {
        code: string;
        active: boolean;
      },
    ];
    attempts: number;
  };

  @Column({ type: 'bool', default: false })
  can_use_default_password: boolean;

  @Column({ type: 'bool', default: false })
  onboard: boolean;

  @Column({ type: 'bool', default: false })
  dashboard_tour: boolean;

  // RELATIONS
  @OneToMany(() => UserSession, (session) => session.user)
  sessions: UserSession[];

  // Helper method to get active sessions
  getActiveSessions(): UserSession[] {
    return (
      this.sessions?.filter(
        (session) => session.status === SessionStatus.ACTIVE,
      ) ?? []
    );
  }
}
