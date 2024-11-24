import { Column, Table, Model, HasMany } from 'sequelize-typescript';
import Sequelize from 'sequelize';

// Relations
import { Product } from './product.model';

@Table({
  tableName: 'user',
  paranoid: true,
  deletedAt: 'deletedAt',
  timestamps: true,
})
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
    field: 'id',
  })
  id: number;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  lastName: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  })
  userName: string;

  @Column({
    allowNull: false,
    type: Sequelize.STRING,
  })
  password: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  })
  mobile: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: Sequelize.DATE,
  })
  createdAt: Date;

  @Column({
    type: Sequelize.DATE,
  })
  updatedAt: Date;

  @Column({
    type: Sequelize.DATE,
  })
  deletedAt: Date;

  @HasMany(() => Product, { foreignKey: 'userId' })
  Product: Product[];
}
