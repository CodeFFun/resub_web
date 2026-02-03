import z from "zod"

export const UserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().min(3).max(20),
    fullName: z.string().optional(),
    profilePictureUrl: z.string().optional(),
    phoneNumber: z.string().optional(),
    dateOfBirth: z.string().optional(),
    alternateEmail: z.string().optional(),
    role: z.enum(['customer', 'shop', 'admin']).default('customer'),
});

export type UserType = z.infer<typeof UserSchema>;