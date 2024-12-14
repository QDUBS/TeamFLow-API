import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class UpdateSubDepartmentDto {
  @Field()
  @MinLength(2)
  name: string;
}
