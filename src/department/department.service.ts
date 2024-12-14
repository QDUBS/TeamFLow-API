import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,

    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async getAllDepartments() {
    return this.departmentRepository.find({
      relations: ['subDepartments'],
    });
  }

  async getDepartment(id: number) {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new HttpException('Department does not exist', 404);
    }

    return department;
  }

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const { subDepartments, ...departmentData } = createDepartmentDto;

    const department = this.departmentRepository.create(departmentData);

    console.log('Created department');

    if (subDepartments && subDepartments.length > 0) {
      const subDeptEntities = subDepartments.map((subDept) => {
        const subDepartment = this.subDepartmentRepository.create(subDept);
        subDepartment.department = department;
        return subDepartment;
      });
      console.log('About to create sub department', subDeptEntities);

      console.log('Created sub department');

      department.subDepartments = subDeptEntities;

      console.log('Attached subDepartment to its parent department');
    }

    console.log('Saving final department record');

    return await this.departmentRepository.save(department);
  }

  async updateDepartment(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });
    if (!department) {
      throw new NotFoundException('Department does not exist');
    }

    department.name = updateDepartmentDto.name;
    return await this.departmentRepository.save(department);
  }

  async deleteDepartment(id: number): Promise<boolean> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    await this.subDepartmentRepository.delete({ department: department });

    await this.departmentRepository.delete(id);

    return true;
  }
}
