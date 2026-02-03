import mongoose, { Document, Schema } from "mongoose";
import { SubscriptionType } from "../types/subscription.type";

const SubscriptionSchema: Schema = new Schema<SubscriptionType>(
    {
        status: { type: String, required: true },
        start_date: { type: Date, required: true },
        charge_date: { type: Date },
        remaining_cycle: { type: Number, required: true, min: 0, default: 0 },
        subscription_planId: { type: Schema.Types.ObjectId, ref: "SubscriptionPlan", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: true,
    }
);

export interface ISubscription extends SubscriptionType, Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const SubscriptionModel = mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
