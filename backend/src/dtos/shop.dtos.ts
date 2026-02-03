import z from "zod";
import { ShopSchema } from "../types/shop.type";
export const CreateShopDTO = ShopSchema.pick(
    {
        name: true,
        addressId: true,
        pickup_info: true,
        userId: true,
        accepts_subscription: true,
    }
).extend({
    shop_banner: z.string().optional(),
});
export type CreateShopDTO = z.infer<typeof CreateShopDTO>;
export const UpdateShopDTO = ShopSchema.partial();
export type UpdateShopDTO = z.infer<typeof UpdateShopDTO>;