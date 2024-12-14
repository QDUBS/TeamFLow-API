import { Field, InputType } from '@nestjs/graphql';
import { MinLength, ValidateNested } from 'class-validator';
import { CreateSubDepartmentDto } from './create-sub-department.dto';

@InputType()
export class CreateDepartmentDto {
  @Field()
  @MinLength(2)
  name: string;

  @Field(() => [CreateSubDepartmentDto], { nullable: true })
  @ValidateNested({ each: true })
  subDepartments?: CreateSubDepartmentDto[];
}
 