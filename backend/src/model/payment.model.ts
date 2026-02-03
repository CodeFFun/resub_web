import mongoose, { Document, Schema } from "mongoose";
import { PaymentType } from "../types/payment.type";

const PaymentSchema: Schema = new Schema<PaymentType>(
    {
        provider: { type: String, required: true },
        status: { type: String, required: true },
        amount: { type: Number, required: true, min: 0 },
        paid_at: { type: Date },
        orderId: { type: mongoose.Types.ObjectId, required: true}
    },
    {
        timestamps: true,
    }
);

export interface IPayment extends PaymentType, Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const PaymentModel = mongoose.model<IPayment>("Payment", PaymentSchema);
