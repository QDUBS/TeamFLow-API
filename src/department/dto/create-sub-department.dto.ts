import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateSubDepartmentDto {
  @Field()
  departmentId: number;

  @Field()
  @MinLength(2)
  name: string;
}
