import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { DepartmentResolver } from './resolvers/department.resolver';
import { SubDepartmentResolver } from './resolvers/sub-department.resolver';
import { SubDepartmentService } from './sub-department.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department, SubDepartment])],
  providers: [
    DepartmentService,
    DepartmentResolver,
    SubDepartmentService,
    SubDepartmentResolver,
  ],
})
export class DepartmentModule {}
