import { z } from "zod";

export const UserValidationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    role: z.enum([ "admin" , "user" ]),
    address: z.string(),
})