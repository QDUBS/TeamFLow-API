import { Get, Post, Req, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalGuard } from '../guards/local.guard';
import { UserService } from '../user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  @UseGuards(LocalGuard)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
    @Req() request: Request,
  ) {
    return request.user;
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async status(@Req() request: Request) {
    return request.user;
  }
}