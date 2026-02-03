import { IDelivery, DeliveryModel } from "../model/delivery.model";

export interface IDeliveryRepository {
    getDeliveryById(id: string): Promise<IDelivery | null>;
    createDelivery(deliveryData: Partial<IDelivery>): Promise<IDelivery>;
    getAllDeliveries(): Promise<IDelivery[]>;
    getAllDeliveriesByStatus(status: string): Promise<IDelivery[]>;
    getAllDeliveriesByCourierName(courierName: string): Promise<IDelivery[]>;
    updateDelivery(id: string, updateData: Partial<IDelivery>): Promise<IDelivery | null>;
    deleteDelivery(id: string): Promise<boolean>;
}

export class DeliveryRepository implements IDeliveryRepository {
    async getDeliveryById(id: string): Promise<IDelivery | null> {
        return await DeliveryModel.findById(id);
    }
    async createDelivery(deliveryData: Partial<IDelivery>): Promise<IDelivery> {
        return await DeliveryModel.create(deliveryData);
    }
    async getAllDeliveries(): Promise<IDelivery[]> {
        return await DeliveryModel.find();
    }
    async getAllDeliveriesByStatus(status: string): Promise<IDelivery[]> {
        return await DeliveryModel.find({ status });
    }
    async getAllDeliveriesByCourierName(courierName: string): Promise<IDelivery[]> {
        return await DeliveryModel.find({ courier_name: courierName });
    }
    async updateDelivery(id: string, updateData: Partial<IDelivery>): Promise<IDelivery | null> {
        return await DeliveryModel.findByIdAndUpdate({ _id: id, orderId: updateData.orderId }, updateData, { new: true });
    }
    async deleteDelivery(id: string): Promise<boolean> {
        const result = await DeliveryModel.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
}