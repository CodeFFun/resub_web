import mongoose, { Document, Schema } from "mongoose";
import { SubscriptionPlanType } from "../types/subscription-plan.type";

const SubscriptionPlanSchema: Schema = new Schema<SubscriptionPlanType>(
    {
        frequency: { type: Number, required: true },
        interval_value: { type: Number, required: true, min: 1 },
        price_per_cycle: { type: Number, required: true, min: 0 },
        active: { type: Boolean, default: false },
        productId: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
        shopId: { type: Schema.Types.ObjectId, ref: "Shop"},
    },
    {
        timestamps: true,
    }
);

export interface ISubscriptionPlan extends SubscriptionPlanType, Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const SubscriptionPlanModel = mongoose.model<ISubscriptionPlan>("SubscriptionPlan", SubscriptionPlanSchema);
