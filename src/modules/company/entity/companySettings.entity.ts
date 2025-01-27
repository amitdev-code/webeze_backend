import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity('company_settings')
export class CompanySettingsEntity extends BaseEntity {
  @Column({ type: 'bool', default: false })
  txt_record_added: boolean;

  @Column({ type: 'jsonb', default: [] })
  txt_record: [];

  @Column({
    type: 'jsonb',
    default: {
      url: '',
      url_temp: '',
      root_url: '',
      error_url: '',
      cloudflare: '',
    },
  })
  cname: {
    url: string;
    url_temp: string;
    root_url: string;
    error_url: string;
    cloudflare: string;
  };

  @Column({ type: 'bool', default: false })
  is_admin_created: boolean;

  @Column({ type: 'timestamp', nullable: true })
  subscription_updated: Date;

  @Column({
    type: 'jsonb',
    default: {
      subscription_status: '',
      plan_id: null,
    },
  })
  previousPlan: {
    subscription_status: string;
    plan_id: number;
  };

  @Column({
    type: 'jsonb',
    default: {
      chargebee_customer_id: null,
      stripe_customer_id: null,
      chargebee_subscription_id: null,
      chargebee_plan_id: null,
      user: null,
      configured: false,
      chargebee_subscription_status: null,
      customer_card_status: null,
      revenue_till_date: null,
      subscription: {
        start: null,
        end: null,
        billing_unit: null,
        percent_cycle_over: 0,
        subs_cancel_date: null,
      },
      plan_price: 0,
      mrr: 0,
    },
  })
  billing: {
    chargebee_customer_id: string;
    stripe_customer_id: string;
    chargebee_subscription_id: string;
    chargebee_plan_id: string;
    user: number;
    configured: boolean;
    chargebee_subscription_status: string;
    customer_card_status: string;
    revenue_till_date: string;
    subscription: {
      start: Date;
      end: Date;
      billing_unit: string;
      percent_cycle_over: number;
      subs_cancel_date: Date;
    };
    plan_price: number;
    mrr: number;
  };

  @Column({
    type: 'jsonb',
    default: {
      smtp_default_mail: null,
      smtp_username: null,
      smtp_password: null,
      smtp_domain: null,
      smtp_port: null,
      smtp_ssl: false,
      is_configured: false,
    },
  })
  smtp: {
    smtp_default_mail: string;
    smtp_username: string;
    smtp_password: string;
    smtp_domain: string;
    smtp_port: number;
    smtp_ssl: boolean;
    is_configured: boolean;
  };

  @Column({
    type: 'jsonb',
    default: {
      account_sid: null,
      auth_token: null,
      phone_number: null,
      is_configured: false,
    },
  })
  sms: {
    account_sid: string;
    auth_token: string;
    phone_number: string;
    is_configured: boolean;
  };

  @Column({ type: 'bool', default: false })
  two_fact_auth: boolean;

  @Column({ type: 'int' })
  company_id: string;

  @OneToOne(() => CompanyEntity, (company) => company.settings)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
