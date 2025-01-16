import { BaseEntity } from '@common/entity/baseEntity';
import { Entity } from 'typeorm';

@Entity('user_permission')
export class UserPermission extends BaseEntity {}
