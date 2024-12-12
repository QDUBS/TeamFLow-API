import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubDepartment } from './sub-department.entity';

@Entity({ name: 'Departments' })
@ObjectType()
export class Department {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => SubDepartment, (subDept) => subDept.department, {
    cascade: true,
  })
  @Field(() => [SubDepartment], { nullable: true })
  subDepartments: SubDepartment[];
}
