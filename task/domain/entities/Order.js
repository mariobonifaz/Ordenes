"use strict";
// Order.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const Sequelize_1 = require("../../../Database/Sequelize"); // Asegúrate de que la ruta a la configuración de Sequelize sea correcta
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
    },
    estatus: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: Sequelize_1.sequelize,
    modelName: 'Order',
    tableName: 'orders' // Especifica explícitamente el nombre de la tabla
});
