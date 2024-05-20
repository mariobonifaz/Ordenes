import { Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';
import { sequelize } from '../../../Database/Sequelize'; // Ajusta esta ruta según tu estructura
import Order from './OrderModel';

export class OrderDetail extends Model {
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public price!: number;
  public quantity!: number;

  // Define la relación aquí
  public getOrder!: BelongsToGetAssociationMixin<Order>;
}

OrderDetail.init({
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  orderId: {
      type: DataTypes.INTEGER,
      references: {
          model: 'orders', // Asegúrate de que esto coincide con el nombre de la tabla 'orders'
          key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
  },
  productId: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  price: {
      type: DataTypes.FLOAT,
      allowNull: false
  },
  quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
  }
}, {
  sequelize,
  modelName: 'OrderDetailsModel',
  tableName: 'ordersDetails' // Especifica explícitamente el nombre de la tabla
});