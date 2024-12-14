import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateSubDepartmentDto {
  @Field()
  @MinLength(2)
  name: string;
}
