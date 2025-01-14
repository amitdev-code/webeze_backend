import { BaseEntity } from 'src/common/entity/baseEntity';
import { Entity } from 'typeorm';

@Entity('users_profile')
export class UserProfileEntity extends BaseEntity {}
