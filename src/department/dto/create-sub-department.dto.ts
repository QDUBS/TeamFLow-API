import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { CreateDepartmentDto } from "./create-department.dto";

@InputType()
export class CreateSubDepartmentDto {
  @Field()
  @MinLength(2)
  name: string;

  @Field()
  departmentId: number;
}
