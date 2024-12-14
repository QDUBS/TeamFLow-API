import { Field, InputType } from '@nestjs/graphql';
import { MinLength, ValidateNested } from 'class-validator';
import { UpdateSubDepartmentDto } from './update-sub-department.dto';

@InputType()
export class UpdateDepartmentDto {
  @Field()
  @MinLength(2)
  name: string;
}
