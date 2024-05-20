import { Order } from "../../domain/entities/Order";
import OrderDetail from "../../domain/entities/OrderDetailsModel";

export interface OrdenesRepository {
    createOrden(orden: Order, details: OrderDetail[]): Promise<Order>;
    getAllOrdenes(): Promise<Order[]>;
    updateOrderStatus(id: string, estatus: string): Promise<Order>;
}
