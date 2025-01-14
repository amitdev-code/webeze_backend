import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';
import { IUser } from './interfaces/user.interface';

@Entity('users')
export class UsersEntity extends BaseEntity implements IUser {
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'json' })
  useremail: {
    email: string;
    is_verified: boolean;
    is_primary: boolean;
  };

  @Column({ type: 'varchar', length: 255 })
  password: string;
}
