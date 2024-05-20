import { Order } from '../../../domain/entities/Order';
import { OrdenesRepository } from '../../../infraestructure/repositories/OrdenesRepositoy';
import OrderDetailsModel from "../../../domain/entities/OrderDetailsModel";

export class OrdenesService {
    constructor(
        private ordenesRepository: OrdenesRepository
    ) {}

    async createOrden(orden: Order, details: OrderDetailsModel[]): Promise<Order> {
        try {
            return await this.ordenesRepository.createOrden(orden, details);
        } catch (error) {
            throw new Error(`Error creating order: ${(error as Error).message}`);
        }
    }

    async getAllOrdenes(): Promise<Order[]> {
        try {
            return await this.ordenesRepository.getAllOrdenes();
        } catch (error) {
            throw new Error(`Error getting all orders: ${(error as Error).message}`);
        }
    }

    async updateOrderStatus(id: string, estatus: string): Promise<Order> {
        try {
            return await this.ordenesRepository.updateOrderStatus(id, estatus);
        } catch (error) {
            throw new Error(`Error updating order status: ${(error as Error).message}`);
        }
    }
}
