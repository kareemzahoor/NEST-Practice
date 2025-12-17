import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/registerUser.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    console.log('🚀 ~ AuthService ~ register ~ registerDto:', registerDto);
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const user = await this.userService.createUser({
        ...registerDto,
        password: hashedPassword,
      });

      const payload = { id: user.id, email: user.email, role: user.role };
      const token = await this.jwtService.signAsync(payload);
      console.log('🚀 ~ AuthService ~ register ~ token:', token);

      return {
        user,
        token,
      };
    } catch (error) {
      console.log('🚀 ~ AuthService ~ register ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findUserByEmail(loginDto.email);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }
      const payload = { id: user.id, email: user.email, role: user.role };
      const token = await this.jwtService.signAsync(payload);
      return {
        user,
        token,
      };
    } catch (error) {
      console.log('🚀 ~ AuthService ~ login ~ error:', error);
      throw new BadRequestException(error.message);
    }
  }
}
