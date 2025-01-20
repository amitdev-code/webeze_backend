import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PlansService } from '../providers/plans.service';
import { PlansEntity } from '../entity/plans.entity';
import { CreatePlanDto } from '@plans_modules/dto/createPlanDto';
import { UpdatePlanDto } from '@plans_modules/dto/updatePlanDto';

@ApiTags('Plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  /**
   * Create a new plan
   * @param {CreatePlanDto} plan - The plan data
   * @returns {Promise<PlansEntity>} The created plan
   */
  @ApiOperation({ summary: 'Create a new plan' })
  @ApiResponse({
    status: 201,
    description: 'The plan has been successfully created.',
    type: PlansEntity,
  })
  @ApiBody({
    type: CreatePlanDto,
    required: true,
    description: 'The plan data',
  })
  @Post()
  async addPlan(@Body() plan: CreatePlanDto): Promise<PlansEntity> {
    const planEntity = new PlansEntity();
    Object.assign(planEntity, plan);
    return this.plansService.addPlan(planEntity);
  }

  /**
   * Edit an existing plan
   * @param {string} id - The ID of the plan to edit
   * @param {UpdatePlanDto} plan - The new plan data
   * @returns {Promise<PlansEntity>} The updated plan
   */
  @ApiOperation({ summary: 'Edit an existing plan' })
  @ApiResponse({
    status: 200,
    description: 'The plan has been successfully updated.',
    type: PlansEntity,
  })
  @ApiBody({
    type: UpdatePlanDto,
    required: true,
    description: 'The new plan data',
  })
  @Put(':id')
  async editPlan(
    @Param('id') id: string,
    @Body() plan: UpdatePlanDto,
  ): Promise<PlansEntity> {
    return this.plansService.editPlan(id, plan);
  }

  /**
   * Delete a plan
   * @param {string} id - The ID of the plan to delete
   * @returns {Promise<void>}
   */
  @ApiOperation({ summary: 'Delete a plan' })
  @ApiResponse({
    status: 200,
    description: 'The plan has been successfully deleted.',
  })
  @Delete(':id')
  async deletePlan(@Param('id') id: string): Promise<void> {
    return this.plansService.deletePlan(id);
  }
}
