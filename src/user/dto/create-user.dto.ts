import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @MinLength(2)
  username: string;

  @Field()
  @MinLength(2)
  password: string;
}
