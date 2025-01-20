import { PlanType } from '@constants/plan-type';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsInt, IsEnum } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({ example: 'Basic Plan', description: 'The name of the plan' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This is a basic plan',
    description: 'The description of the plan',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: true, description: 'The status of the plan' })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ example: 5, description: 'The number of templates allowed' })
  @IsInt()
  templates: number;

  @ApiProperty({ example: 1000, description: 'The number of visits allowed' })
  @IsInt()
  visits: number;

  @ApiProperty({
    example: 5,
    description: 'The number of integration accounts allowed',
  })
  @IsInt()
  integrationAccount: number;

  @ApiProperty({ example: 2, description: 'The number of folders allowed' })
  @IsInt()
  folders: number;

  @ApiProperty({ example: 1, description: 'The number of companies allowed' })
  @IsInt()
  companies: number;

  @ApiProperty({
    example: 'default',
    description: 'The type of the plan',
    enum: PlanType,
  })
  @IsEnum(PlanType)
  plan_type: string;

  @ApiProperty({ example: 7, description: 'The duration of the plan in days' })
  @IsInt()
  plan_duration: number;
}
