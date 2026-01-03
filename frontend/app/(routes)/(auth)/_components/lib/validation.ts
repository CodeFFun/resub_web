import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "This field is empty"),
  password: z.string().min(1, "This field is empty"),
})

export const registerSchema = z.object({
  name: z.string().min(1, "This field is empty"),
  email: z.string().min(1, "This field is empty"),
  password: z.string().min(1, "This field is empty"),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
