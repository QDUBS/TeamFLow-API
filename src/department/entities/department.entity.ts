import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubDepartment } from './sub-department.entity';

@Entity({ name: 'Departments' })
@ObjectType()
export class Department {
  @PrimaryGeneratedColumn()
  @Field((type) => Int, { nullable: true })
  id: number;

  @Column()
  @Field({ nullable: true })
  name: string;

  @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, {
    cascade: true,
  })
  @Field(() => [SubDepartment], { nullable: true })
  subDepartments: SubDepartment[];
}
