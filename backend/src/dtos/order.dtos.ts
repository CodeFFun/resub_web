import z from "zod";
import { OrderSchema } from "../types/order.type";

export const CreateOrderDTO = OrderSchema.pick(
    {
        total_amount: true,
        schedule_for: true,
        subscriptionId: true,
        userId: true,
        shopId: true,
    }
)
export type CreateOrderDTO = z.infer<typeof CreateOrderDTO>

export const UpdateOrderDTO = OrderSchema.partial();
export type UpdateOrderDTO = z.infer<typeof UpdateOrderDTO>