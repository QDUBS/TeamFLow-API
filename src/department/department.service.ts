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
    return this.departmentRepository.find();
  }

  async getDepartment(id: number) {
    const department = await this.departmentRepository.findOneBy({
      id,
    });

    // Check if record does exist
    if (!department) {
      throw new HttpException('Department does not exist', 404);
    }

    return department;
  }

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const { subDepartments, ...rest } = createDepartmentDto;

    const departmentEntity = this.departmentRepository.create({
      ...rest,
      subDepartments: subDepartments?.map((subDept) => ({
        ...subDept,
      })),
    });

    return await this.departmentRepository.save(departmentEntity);
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

  async deleteDepartment(id: number) {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException('Department does not exist');
    }

    const sub_department = await this.subDepartmentRepository.findOneBy({
      departmentId: department.id,
    });

    await this.departmentRepository.remove(department);
    await this.subDepartmentRepository.remove(sub_department);

    return true;
  }
}
