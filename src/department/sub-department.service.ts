import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubDepartmentDto } from './dto/create-sub-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { UpdateSubDepartmentDto } from './dto/update-sub-department.dto';

@Injectable()
export class SubDepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async getSubDepartment(name: string) {
    const department = await this.subDepartmentRepository.findOneBy({
      name,
    });
    if (!department) {
      throw new NotFoundException('Department does not exist');
    }

    return department;
  }

  async createSubDepartment(createSubDepartmentDto: CreateSubDepartmentDto) {
    const department = await this.departmentRepository.findOneBy({
      name: createSubDepartmentDto.name,
    });

    if (!department) {
      throw new NotFoundException();
    }

    const newSubDepartment = this.subDepartmentRepository.create(
      createSubDepartmentDto,
    );

    const savedSubDepartment =
      await this.subDepartmentRepository.save(newSubDepartment);

    department.subDepartments = [savedSubDepartment];
    await this.subDepartmentRepository.save(department);

    return savedSubDepartment;
  }

  async updateSubDepartment(
    id: number,
    updateSubDepartmentDto: UpdateSubDepartmentDto,
  ) {
    const subDepartment = await this.subDepartmentRepository.findOne({
      where: { id },
    });

    if (!subDepartment) {
      throw new NotFoundException('Sub-department not found');
    }

    subDepartment.name = updateSubDepartmentDto.name;
    return await this.subDepartmentRepository.save(subDepartment);
  }

  async deleteSubDepartment(id: number) {
    const subDepartment = await this.subDepartmentRepository.findOne({
      where: { id },
    });

    if (!subDepartment) {
      throw new NotFoundException('Sub-department not found');
    }

    await this.subDepartmentRepository.remove(subDepartment);
    return true;
  }
}
