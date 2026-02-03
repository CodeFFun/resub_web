import z from "zod";
import { UserSchema } from "../types/user.type";
export const CreateUserDTO = UserSchema.pick(
    {
        email: true,
        password: true,
        username: true,
        role: true,
    }
)
export type CreateUserDTO = z.infer<typeof CreateUserDTO>;

export const LoginUserDTO = z.object({
    email: z.email(),
    password: z.string().min(6)
});

export type LoginUserDTO = z.infer<typeof LoginUserDTO>;

export const RoleDTO = UserSchema.pick(
    {
        role: true,
    }
)
export type RoleDTO = z.infer<typeof RoleDTO>;
export const UpdateUserDTO = UserSchema.pick({
    fullName: true,
    profilePictureUrl: true,
    phoneNumber: true,
    alternateEmail: true,
})
.partial()
.merge(
    z.object({
        password: z.string().optional(),
    })
);

export type UpdateUserDTO = z.infer<typeof UpdateUserDTO>;