import z from "zod";
import { UserSchema } from "../types/user.type";
export const CreateUserDTO = UserSchema.pick(
    {
        email: true,
        password: true,
        username: true,
    }
)
export type CreateUserDTO = z.infer<typeof CreateUserDTO>;

export const LoginUserDTO = z.object({
    email: z.email(),
    password: z.string().min(6)
});
export type LoginUserDTO = z.infer<typeof LoginUserDTO>;