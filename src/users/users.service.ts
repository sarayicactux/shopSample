import {
    BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { User } from '../models/user.model';
import { RegisterDto } from 'src/DTO/auth.dto';
import { UserDataAccess } from 'src/dataAccess/user.dataAccess';
import { Identifier } from 'sequelize';

@Injectable()
export class UserService {
  constructor(private readonly userDataAccess: UserDataAccess) {}

  async findAll(): Promise<User[]> {
    return await this.userDataAccess.findAll();
  }

  async updateUser(id: Identifier, updateUserDto: UpdateUserDto) {
    const user = await this.userDataAccess.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.mobile) {
      const isMobileValid = /^[0-9]{11}$/.test(updateUserDto.mobile);
      if (!isMobileValid) {
        throw new BadRequestException('Invalid mobile number format');
      }
    }

    const result = await this.userDataAccess.update(
      id,
      updateUserDto.name,
      updateUserDto.lastName,
      updateUserDto.userName,
      updateUserDto.mobile,
      updateUserDto.email,
    );

    return result;
  }

//   async createUser(createUserDto: RegisterDto) {
//     const { name, lastName, userName, password, mobile, email } = createUserDto;
//     const user = await this.userDataAccess.createUser(
//       name,
//       lastName,
//       userName,
//       password,
//       mobile,
//       email,
//     );
//     return user;
//   }

  async findOne(id: number) {
    const user = await this.userDataAccess.findOne(id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async deleteUser(userId: Identifier): Promise<boolean> {
    const user = await this.userDataAccess.findByIdDeleteUser(userId);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'user not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userDataAccess.destroy(userId);
    return true;
  }
}
