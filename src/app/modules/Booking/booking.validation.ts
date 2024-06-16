import { z } from "zod";

export const BookingValidationSchema = z.object({
    date: z.string().date(),
    startTime: z.string(),
    endTime: z.string(),
    user: z.string(),
    facility: z.string(),
    payableAmount: z.number(),
    isBooked: z.enum(['confirmed', 'unconfirmed', 'canceled']),
})