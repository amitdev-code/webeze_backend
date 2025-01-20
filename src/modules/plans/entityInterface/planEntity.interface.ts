import { PlanType } from '@constants/plan-type';

export interface IPlans {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  active: boolean;
  templates: number;
  visits: number;
  integrationAccount: number;
  folders: number;
  companies: number;
  plan_type: PlanType;
  plan_duration: number;
  is_subscribable: boolean;
}
