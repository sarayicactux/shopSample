import * as Models from '../models/index';

export class ProductDataAccess {
  async create(
    userId: number,
    title: string,
    description: string,
    price: number,
  ) {
    try {
      const result = await Models.Product.create({
        title,
        userId,
        description,
        price,
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(): Promise<Models.Product[]> {
    return await Models.Product.findAll();
  }

  async findOne(id) {
    try {
      const result = await Models.Product.findByPk(id);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
