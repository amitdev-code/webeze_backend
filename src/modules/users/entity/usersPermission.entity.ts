import { BaseEntity } from 'src/common/entity/baseEntity';
import { Entity } from 'typeorm';

@Entity('users_permission')
export class UserPermission extends BaseEntity {}
