import { Schema, model } from "mongoose";
import { TBooking, TBookingStatus } from "./booking.interface";

export const bookingStatus : TBookingStatus[] = [
    'confirmed', 'unconfirmed', 'canceled'
]

const bookingSchema = new Schema<TBooking>({
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    facility: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Facility'
    },
    payableAmount: {
        type: Number,
        required: true,
    },
    isBooked: {
        type: String,
        enum: bookingStatus,
        required: true,
    }
})

export const Booking = model<TBooking>('Booking', bookingSchema)

