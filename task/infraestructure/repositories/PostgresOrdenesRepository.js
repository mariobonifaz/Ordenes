"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresOrdenesRepository = void 0;
const OrderModel_1 = __importDefault(require("../../domain/entities/OrderModel"));
const OrderDetailsModel_1 = __importDefault(require("../../domain/entities/OrderDetailsModel"));
const axios_1 = __importDefault(require("axios"));
class PostgresOrdenesRepository {
    createOrden(orden, details) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newOrden = yield OrderModel_1.default.create({
                    total: orden.total,
                    fecha: orden.fecha,
                    estatus: orden.estatus
                }, {
                    include: [{ model: OrderDetailsModel_1.default, as: 'details' }]
                });
                // Crear cada detalle de orden y asociarlo
                for (const detail of details) {
                    yield OrderDetailsModel_1.default.create({
                        orderId: newOrden.id,
                        productId: detail.productId,
                        price: detail.price,
                        quantity: detail.quantity
                    });
                }
                return newOrden;
            }
            catch (error) {
                throw new Error(`Error creating order: ${error.message}`);
            }
        });
    }
    getAllOrdenes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ordenes = yield OrderModel_1.default.findAll();
                return ordenes.map(orden => orden.toJSON());
            }
            catch (error) {
                throw new Error(`Error getting all orders: ${error.message}`);
            }
        });
    }
    updateOrderStatus(id, estatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield OrderModel_1.default.findByPk(id, {
                    include: [{ model: OrderDetailsModel_1.default, as: 'details' }]
                });
                if (!order) {
                    throw new Error("Order not found");
                }
                // Verificar si el estatus es "enviado"
                if (estatus === 'enviado' && order.estatus !== 'enviado') {
                    for (const detail of order.details) { // Usamos la propiedad details
                        yield this.updateProductStock(detail.productId, detail.quantity);
                    }
                }
                order.estatus = estatus;
                yield order.save();
                return order;
            }
            catch (error) {
                throw new Error(`Error updating order status: ${error.message}`);
            }
        });
    }
    updateProductStock(productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productServiceUrl = 'http://localhost:3001/api/v2/productos/update-stock'; // URL del servicio de productos
                yield axios_1.default.post(productServiceUrl, { productId, quantity });
            }
            catch (error) {
                console.error('Error updating product stock:', error);
            }
        });
    }
}
exports.PostgresOrdenesRepository = PostgresOrdenesRepository;
