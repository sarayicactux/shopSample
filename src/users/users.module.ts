import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { User } from '../models/user.model';
import { UserDataAccess } from 'src/dataAccess/user.dataAccess';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserDataAccess],
  exports: [UserService],
})
export class UsersModule {}
