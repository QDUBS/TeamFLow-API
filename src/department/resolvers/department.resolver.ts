import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { DepartmentService } from '../department.service';
import { CreateSubDepartmentDto } from '../dto/create-sub-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Department } from '../entities/department.entity';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  // Get all departments
  @UseGuards(JwtAuthGuard)
  @Query(() => Department)
  async getAllDepartments() {
    return await this.departmentService.getAllDepartments();
  }
 
  // Get a department
  @UseGuards(JwtAuthGuard)
  @Query(() => Department, { nullable: true })
  async getDepartment(@Args('id', { type: () => Int }) id: number) {
    return await this.departmentService.getDepartment(id);
  }

  // Create a department
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  async createDepartment(
    @Args('createDepartmentDto') createDepartmentDto: CreateSubDepartmentDto,
  ) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  // Update a department
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  async updateDepartment(
    @Args('updateDepartmentDto') updateDepartmentDto: UpdateDepartmentDto,
  ) {
    if (updateDepartmentDto.name.length < 2) {
      throw new Error('Department name must be at least 2 characters long');
    }

    return await this.departmentService.updateDepartment(
      updateDepartmentDto.id,
      updateDepartmentDto,
    );
  }

  // Delete a department
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteDepartment(@Args('id', { type: () => Int }) id: number) {
    return await this.departmentService.deleteDepartment(id);
  }
}
