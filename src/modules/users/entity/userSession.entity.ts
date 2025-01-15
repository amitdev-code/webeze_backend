import { BaseEntity } from 'src/common/entity/baseEntity';
import { Entity } from 'typeorm';

@Entity('user_session')
export class UserSession extends BaseEntity {}
