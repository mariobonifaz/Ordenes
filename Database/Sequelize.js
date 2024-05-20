"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('servicioOrder', 'postgres', 'POSTGRES', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {}
});
const OrderModel_1 = __importDefault(require("../task/domain/entities/OrderModel"));
const OrderDetailsModel_1 = __importDefault(require("../task/domain/entities/OrderDetailsModel"));
OrderModel_1.default.hasMany(OrderDetailsModel_1.default, { foreignKey: 'orderId', as: 'details' });
OrderDetailsModel_1.default.belongsTo(OrderModel_1.default, { foreignKey: 'orderId', as: 'order' });
// Autenticación y sincronización de la base de datos
exports.sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
    // Sincroniza todos los modelos con la base de datos
    exports.sequelize.sync().then(() => {
        console.log('Models are synchronized with the database.');
    });
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
