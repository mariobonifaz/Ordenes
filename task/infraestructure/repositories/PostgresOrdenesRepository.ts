import { Order } from "../../domain/entities/Order";
import { OrdenesRepository } from "../repositories/OrdenesRepositoy";
import OrdenModel from "../../domain/entities/OrderModel";
import OrderDetail from "../../domain/entities/OrderDetailsModel";
import axios from "axios";

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
            const order = await OrdenModel.findByPk(id, {
                include: [{ model: OrderDetail, as: 'details' }]
            });
            if (!order) {
                throw new Error("Order not found");
            }

            // Verificar si el estatus es "enviado"
            if (estatus === 'enviado' && order.estatus !== 'enviado') {
                for (const detail of order.details!) {  // Usamos la propiedad details
                    await this.updateProductStock(detail.productId, detail.quantity);
                }
            }

            order.estatus = estatus;
            await order.save();
            return order;
        } catch (error) {
            throw new Error(`Error updating order status: ${(error as Error).message}`);
        }
    }

    private async updateProductStock(productId: number, quantity: number) {
        try {
            const productServiceUrl = 'http://localhost:3001/api/v2/productos/update-stock';  // URL del servicio de productos
            await axios.post(productServiceUrl, { productId, quantity });
        } catch (error) {
            console.error('Error updating product stock:', error);
        }
    }
    
}
