import z from "zod"
import { SubscriptionPlanSchema } from "../types/subscription-plan.type"

export const CreateSubscriptionPlanDTO = SubscriptionPlanSchema.pick(
    {
        frequency: true,
        interval_value: true,
        price_per_cycle: true,
        shopId: true,
    }
)

export type CreateSubscriptionPlanDTO = z.infer<typeof CreateSubscriptionPlanDTO>

export const UpdateSubscriptionPlanDTO = SubscriptionPlanSchema.partial();
export type UpdateSubscriptionPlanDTO = z.infer<typeof UpdateSubscriptionPlanDTO>