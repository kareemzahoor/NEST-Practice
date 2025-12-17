import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(registerDto: RegisterDto) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { email: registerDto.email },
      });
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }
      const user = this.usersRepository.create(registerDto);
      await this.usersRepository.save(user);
      console.log('🚀 ~ UsersService ~ createUser ~ user:', user);
      return user;
    } catch (error) {
      console.log('🚀 ~ UsersService ~ createUser ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }
}
