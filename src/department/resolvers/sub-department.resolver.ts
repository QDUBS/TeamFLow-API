import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/user/guards/jwt.guard';
import { CreateSubDepartmentDto } from '../dto/create-sub-department.dto';
import { UpdateSubDepartmentDto } from '../dto/update-sub-department.dto';
import { Department } from '../entities/department.entity';
import { SubDepartment } from '../entities/sub-department.entity';
import { SubDepartmentService } from '../sub-department.service';

@Resolver(() => SubDepartment)
export class SubDepartmentResolver {
  constructor(private subDepartmentService: SubDepartmentService) {}

  // Get a sub-department
  @UseGuards(JwtAuthGuard)
  @Query(() => Department, { nullable: true })
  async getSubDepartment(@Args('name', { type: () => String }) name: string) {
    return await this.subDepartmentService.getSubDepartment(name);
  }

  // Create a sub-department
  @UseGuards(JwtAuthGuard)
  @Mutation(() => SubDepartment)
  async createSubDepartment(
    @Args('createSubDepartmentData')
    createSubDepartmentDto: CreateSubDepartmentDto,
  ) {
    const newSubDepartment =
      await this.subDepartmentService.createSubDepartment(
        createSubDepartmentDto,
      );
    return newSubDepartment;
  }

  // Update a sub-department
  @UseGuards(JwtAuthGuard)
  @Mutation(() => SubDepartment)
  async updateSubDepartment(
    @Args('updateSubDepartmentDto')
    updateSubDepartmentDto: UpdateSubDepartmentDto,
  ) {
    if (updateSubDepartmentDto.name.length < 2) {
      throw new Error('Sub-department name must be at least 2 characters long');
    }

    return await this.subDepartmentService.updateSubDepartment(
      updateSubDepartmentDto.id,
      updateSubDepartmentDto,
    );
  }

  // Delete a sub-department
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteSubDepartment(@Args('id', { type: () => Int }) id: number) {
    return await this.subDepartmentService.deleteSubDepartment(id);
  }
}
