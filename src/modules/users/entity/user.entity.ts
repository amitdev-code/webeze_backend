import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';
import { IUser } from './interfaces/user.interface';
import { RoleType } from 'src/constants/role-type';

@Entity('user')
export class UsersEntity extends BaseEntity implements IUser {
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'jsonb' })
  useremail: {
    email: string;
    is_verified: boolean;
    is_primary: boolean;
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

  @Column({ type: 'varchar', length: 255 })
  ip_address: string;

  @Column({ type: 'int', default: 0 })
  session_count: number;
}
