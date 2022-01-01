import { Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

export class LoginDto {
  @Field()
  @MinLength(2)
  username: string;

  @Field()
  @MinLength(2)
  password: string;
}
