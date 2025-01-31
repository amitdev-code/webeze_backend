import { BaseEntity } from 'src/common/entity/baseEntity';
import { Entity } from 'typeorm';

@Entity('templates')
export class TemplatesEntity extends BaseEntity {}
