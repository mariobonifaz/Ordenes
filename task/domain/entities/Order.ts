// Order.ts

import { Model, DataTypes, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin } from 'sequelize';
import { sequelize } from '../../../Database/Sequelize'; // Asegúrate de que la ruta a la configuración de Sequelize sea correcta
import OrderDetail from './OrderDetailsModel';

export class Order extends Model {
    public id!: number;
    public total!: number;
    public fecha!: Date;
    public estatus!: string;
    details?: OrderDetail[]; // Añadimos la propiedad details

    // Define la relación aquí
    public addOrderDetails!: HasManyAddAssociationsMixin<OrderDetail, number>;
    public getOrderDetails!: HasManyGetAssociationsMixin<OrderDetail>;
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataTypes.FLOAT,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    estatus: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders' // Especifica explícitamente el nombre de la tabla
});