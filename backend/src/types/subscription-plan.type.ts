import mongoose from "mongoose";
import z from "zod"

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
}).transform((val) => new mongoose.Types.ObjectId(val));

export const SubscriptionPlanSchema = z.object({
    frequency: z.string().min(1),
    interval_value: z.number().int().positive(),
    price_per_cycle: z.number().positive(),
    active: z.boolean().default(true),
    created_at: z.date().or(z.string()).optional(),
    shopId: objectIdSchema.optional(),
});

export type SubscriptionPlanType = z.infer<typeof SubscriptionPlanSchema>;
