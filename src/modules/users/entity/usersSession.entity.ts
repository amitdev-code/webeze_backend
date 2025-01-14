import { BaseEntity } from 'src/common/entity/baseEntity';
import { Entity } from 'typeorm';

@Entity('users_session')
export class UserSession extends BaseEntity {}
