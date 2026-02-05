import { IPayment, PaymentModel } from "../model/payment.model";

export interface IPaymentRepository {
    createPayment(paymentData: Partial<IPayment>): Promise<IPayment>;
    getPaymentById(id: string): Promise<IPayment | null>;
    getPaymentsByStatus(orderId:string, status: string): Promise<IPayment[]>;
    getPaymentsByProvider(orderId:string, provider: string): Promise<IPayment[]>;
    getPaymentsByOrderId(orderId: string): Promise<IPayment[]>; 
    updatePayment(id: string, updateData: Partial<IPayment>): Promise<IPayment | null>;
    deletePayment(id: string): Promise<boolean>;
}

export class PaymentRepository implements IPaymentRepository {
    async getPaymentsByOrderId(orderId: string): Promise<IPayment[]> {
        return await PaymentModel.find({ orderId: orderId }).exec();
    }
    async createPayment(paymentData: Partial<IPayment>): Promise<IPayment> {
        const payment = new PaymentModel(paymentData);
        return await payment.save();
    }

    async getPaymentById(id: string): Promise<IPayment | null> {
        const payment = await PaymentModel.findById(id);
        return payment;
    }

    async getAllPayments(): Promise<IPayment[]> {
        const payments = await PaymentModel.find();
        return payments;
    }

    async getPaymentsByStatus(orderId:string, status: string): Promise<IPayment[]> {
        const payments = await PaymentModel.find({ orderId: orderId, status: status });
        return payments;
    }

    async getPaymentsByProvider(orderId:string, provider: string): Promise<IPayment[]> {
        const payments = await PaymentModel.find({ orderId: orderId, provider: provider });
        return payments;
    }

    async updatePayment(id: string, updateData: Partial<IPayment>): Promise<IPayment | null> {
        const updatedPayment = await PaymentModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        return updatedPayment;
    }

    async deletePayment(id: string): Promise<boolean> {
        const result = await PaymentModel.findByIdAndDelete(id);
        return result ? true : false;
    }
}
