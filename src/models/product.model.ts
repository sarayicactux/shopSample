import {
  Column,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import Sequelize from 'sequelize';
// Relations
import { User } from './user.model';

@Table({
  tableName: 'product',
  paranoid: true,
  deletedAt: 'deletedAt',
})
export class Product extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'user', key: 'id' },
  })
  userId: number;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  title: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: Sequelize.INTEGER,
    allowNull: true,
  })
  price: number;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  User: User;
}
