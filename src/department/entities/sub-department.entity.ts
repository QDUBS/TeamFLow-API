import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from './department.entity';

@Entity({ name: 'SubDepartments' })
@ObjectType()
export class SubDepartment {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Department, (department) => department.subDepartments)
  department: Department;
}

