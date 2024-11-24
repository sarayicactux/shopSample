import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../models/product.model';
import { CreateProductDto, UpdateProductDto } from '../DTO/product.dto';
import { UserService } from 'src/users/users.service';
import { ProductDataAccess } from 'src/dataAccess/product.dataAccess';
import userGuard from 'src/users/userGuards';
@Injectable()
export class ProductService {
  constructor(
    private readonly userService: UserService,
    private readonly productDataAccess: ProductDataAccess,
  ) {}
  async create(
    user: userGuard,
    createProductDto: CreateProductDto,
  ): Promise<boolean> {
    const { title, userId, description, price } = createProductDto;
    await this.userService.findOne(userId);
    await this.productDataAccess.create(userId, title, description, price);
    return true;
  }

  async findAll(): Promise<Product[]> {
    return this.productDataAccess.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productDataAccess.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
}
