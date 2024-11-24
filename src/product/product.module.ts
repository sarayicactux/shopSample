import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from '../models/product.model';
import { ProductDataAccess } from 'src/dataAccess/product.dataAccess';
import { UserService } from 'src/users/users.service';
import { UserDataAccess } from 'src/dataAccess/user.dataAccess';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductDataAccess, UserService, UserDataAccess],
  exports: [ProductService],
})
export class ProductsModule {}
