"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetail = void 0;
const sequelize_1 = require("sequelize");
const Sequelize_1 = require("../../../Database/Sequelize"); // Ajusta esta ruta según tu estructura
class OrderDetail extends sequelize_1.Model {
}
exports.OrderDetail = OrderDetail;
OrderDetail.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'orders', // Asegúrate de que esto coincide con el nombre de la tabla 'orders'
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: Sequelize_1.sequelize,
    modelName: 'OrderDetailsModel',
    tableName: 'ordersDetails' // Especifica explícitamente el nombre de la tabla
});
