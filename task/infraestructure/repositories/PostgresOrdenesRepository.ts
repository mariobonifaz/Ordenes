import { Order } from "../../domain/entities/Order";
import { OrdenesRepository } from "../repositories/OrdenesRepositoy";
import OrdenModel from "../../domain/entities/OrderModel";
import OrderDetail from "../../domain/entities/OrderDetailsModel";

export class PostgresOrdenesRepository implements OrdenesRepository {
    async createOrden(orden: Order, details: OrderDetail[]): Promise<Order> {
        try {
            const newOrden = await OrdenModel.create({
                total: orden.total,
                fecha: orden.fecha,
                estatus: orden.estatus
            }, {
                include: [{ model: OrderDetail, as: 'details' }]
            });

            // Crear cada detalle de orden y asociarlo
            for (const detail of details) {
                await OrderDetail.create({
                    orderId: newOrden.id,
                    productId: detail.productId,
                    price: detail.price,
                    quantity: detail.quantity
                });
            }

            return newOrden;
        } catch (error) {
            throw new Error(`Error creating order: ${(error as Error).message}`);
        }
    }

    async getAllOrdenes(): Promise<Order[]> {
        try {
            const ordenes = await OrdenModel.findAll();
            return ordenes.map(orden => orden.toJSON() as Order);
        } catch (error) {
            throw new Error(`Error getting all orders: ${(error as Error).message}`);
        }
    }

    async updateOrderStatus(id: string, estatus: string): Promise<Order> {
        try {
            const order = await OrdenModel.findByPk(id);
            if (!order) {
                throw new Error("Order not found");
            }
            order.estatus = estatus;
            await order.save();
            return order;
        } catch (error) {
            throw new Error(`Error updating order status: ${(error as Error).message}`);
        }
    }
}
