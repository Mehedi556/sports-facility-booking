import { Types } from "mongoose";

export type TBookingStatus = 'confirmed' | 'unconfirmed' | 'canceled';

export type TBooking = {
    date: Date;
    startTime: string;
    endTime: string;
    user?: Types.ObjectId;
    facility: Types.ObjectId;
    payableAmount?: number;
    isBooked: TBookingStatus;
}