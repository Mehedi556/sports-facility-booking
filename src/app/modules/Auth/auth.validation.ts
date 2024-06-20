import { z } from "zod";

export const SignupValidationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    role: z.enum([ "admin" , "user" ]),
    address: z.string(),
})


export const LoginValidationSchema = z.object({
    email: z.string().email(),
    password: z.string()
})