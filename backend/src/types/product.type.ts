import mongoose from "mongoose";
import z from "zod"

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
}).transform((val) => new mongoose.Types.ObjectId(val));

export const ProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    base_price: z.number().positive(),
    stock_quantity: z.number().int().nonnegative(),
    shopId: objectIdSchema.optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
