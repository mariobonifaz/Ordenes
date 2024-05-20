import { Request, Response } from 'express';
import { OrdenesService } from '../../application/services/user-cases/OrderService';
import OrderDetail from '../../domain/entities/OrderDetailsModel';

export class OrdenesController {
    constructor(private ordenesService: OrdenesService) {}

    async createOrden(req: Request, res: Response) {
        try {
            const ordenData = req.body;
            const details = ordenData.details.map((d: any) => {
                return {
                    productId: d.productId,
                    price: d.price,
                    quantity: d.quantity
                } as OrderDetail;
            });
            const orden = await this.ordenesService.createOrden(ordenData, details);
            res.status(201).json(orden);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(500).json({ message: "Unknown error" });
            }
        }
    }

    async getAllOrdenes(req: Request, res: Response) {
        try {
            const ordenes = await this.ordenesService.getAllOrdenes();
            res.status(200).json(ordenes);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({error: err.message})
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async updateOrderStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { estatus } = req.body;
            const order = await this.ordenesService.updateOrderStatus(id, estatus);
            res.status(200).json(order);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }
}
