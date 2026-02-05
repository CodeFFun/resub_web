import { HttpError } from "../errors/http-error";
import { IPayment } from "../model/payment.model";
import { PaymentRepository } from "../repositories/payment.repository";

const paymentRepo = new PaymentRepository()

export class PaymentService{
    async createPayment(paymentData: Partial<IPayment>){
        return await paymentRepo.createPayment(paymentData);
    }
    async getPaymentById(id: string){
        if(!id) return new HttpError(400, "Payment Id is Required");
        return await paymentRepo.getPaymentById(id);
    }
    async getPaymentsByStatus(orderId:string, status: string){
        if(!orderId) return new HttpError(400, "Order Id is Required");
        return await paymentRepo.getPaymentsByStatus(orderId, status);
    }
    async getPaymentsByProvider(orderId:string, provider: string){
        if(!orderId) return new HttpError(400, "Order Id is Required");
        return await paymentRepo.getPaymentsByProvider(orderId, provider);
    }
    async getPaymentsByOrderId(orderId: string){
        if(!orderId) return new HttpError(400, "Order Id is Required");
        return await paymentRepo.getPaymentsByOrderId(orderId)
    }
    async updatePayment(id: string, updateData: Partial<IPayment>){
        if(!id) return new HttpError(400, "Payment Id is Required");
        return await paymentRepo.updatePayment(id, updateData);
    }
    async deletePayment(id: string){
        if(!id) return new HttpError(400, "Payment Id is Required");
        return await paymentRepo.deletePayment(id);
    }
}