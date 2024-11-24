import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from 'src/DTO/auth.dto';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDataAccess } from 'src/dataAccess/user.dataAccess';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDataAccess: UserDataAccess,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, lastName, userName, password, mobile, email } = registerDto;

    // بررسی وجود کاربر
    const existingUser = await this.userDataAccess.findByEmail(email);
    if (existingUser) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userDataAccess.createUser(
      name,
      lastName,
      userName,
      hashedPassword,
      mobile,
      email,
    );

    // ساخت توکن برای کاربر جدید
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      access_token: token,
    };
  }

  async login(loginDto: LoginDto) {
    // پیدا کردن کاربر با ایمیل
    const { password, email } = loginDto;
    const user = await this.userDataAccess.findByEmail(email);
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    // چک کردن پسورد
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Wrong password', 400);
    }

    // ساخت توکن
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      access_token: token,
    };
  }
}
