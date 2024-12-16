import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/auth-dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const single_user: User = await this.userRepository.findOne({
      where: { username },
    });

    if (!single_user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (await bcrypt.compare(password, single_user.password)) {
      const { password, ...user } = single_user;

      return {
        token: this.jwtService.sign(user, { expiresIn: '1h' }),
      };
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userEntity = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    return await this.userRepository.save(userEntity);
  }
}
