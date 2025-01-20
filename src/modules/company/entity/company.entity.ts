import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CompanySettingsEntity } from './companySettings.entity';

@Entity('company')
export class CompanyEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  sub_domain: string;

  @Column({ type: 'bool', default: false })
  is_domain_mapped: string;

  @Column({ type: 'bool', default: false })
  agency: boolean;

  @Column({ type: 'bool', default: false })
  marketing_popups: boolean;

  @Column({ type: 'bool', default: false })
  hipaa: boolean;

  @OneToOne(() => CompanySettingsEntity, (settings) => settings.company, {
    cascade: true,
  })
  @JoinColumn()
  settings: CompanySettingsEntity;
}
