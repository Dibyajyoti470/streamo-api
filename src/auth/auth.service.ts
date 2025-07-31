import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.usersService.findByUsername(
      signUpDto.username,
    );

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const newUser = await this.usersService.create({
      ...signUpDto,
      password: hashedPassword,
    });

    return {
      message: 'User signed up successfully',
      data: {
        id: newUser.id,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const existingUser = await this.usersService.findByUsername(
      loginDto.username,
    );

    if (
      !existingUser ||
      !(await bcrypt.compare(loginDto.password, existingUser.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: existingUser.id, username: existingUser.username };

    return {
      message: 'User logged in successfully',
      data: {
        id: existingUser.id,
        username: existingUser.username,
        token: await this.jwtService.signAsync(payload),
      },
    };
  }
}
