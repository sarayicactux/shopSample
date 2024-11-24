import { Identifier } from 'sequelize';
import * as Models from '../models/index';
import { NotFoundException } from '@nestjs/common';

export class UserDataAccess {
  tableName() {
    return Models.User.tableName;
  }

  async findByEmail(email: string): Promise<Models.User> {
    const admin = await Models.User.findOne({
      where: {
        email,
      },
    });
    return admin;
  }

  async findOne(id: Identifier) {
    try {
      const result = await Models.User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(): Promise<Models.User[]> {
    return await Models.User.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async createUser(
    name: string,
    lastName: string,
    userName: string,
    password: string,
    mobile: string,
    email: string,
  ): Promise<Models.User> {
    const user = await Models.User.create({
      name,
      lastName,
      userName,
      password,
      mobile,
      email,
    });
    return user;
  }

  async update(
    id: Identifier,
    name: string,
    lastName: string,
    userName: string,
    mobile: string,
    email: string,
  ) {
    const result = await Models.User.update(
      {
        name,
        lastName,
        userName,
        mobile,
        email,
      },
      {
        where: {
          id: id,
        },
        returning: true, // برگرداندن رکورد به‌روز شده
      },
    );

    return result;
  }

  async findById(id: Identifier): Promise<Models.User | null> {
    try {
      const user = await Models.User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  async findByIdDeleteUser(id: Identifier): Promise<Models.User> {
    const user = await Models.User.findOne({
      where: { id },
    });
    return user;
  }

  async destroy(id: Identifier) {
    await Models.User.destroy({
      where: { id },
    });
  }
}
