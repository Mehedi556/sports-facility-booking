import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Facility } from "../Facility/facility.model";
import { Booking } from "./booking.model";
import { Request } from "express";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const totalSlots = [
  { startTime: "06:00", endTime: "08:00" },
  { startTime: "08:00", endTime: "10:00" },
  { startTime: "10:00", endTime: "12:00" },
  { startTime: "12:00", endTime: "14:00" },
  { startTime: "14:00", endTime: "16:00" },
  { startTime: "16:00", endTime: "18:00" },
  { startTime: "18:00", endTime: "20:00" },
];

const createBookingIntoDB = async (req: Request) => {
  const facilityData = await Facility.findById(req.body?.facility)
  if(!facilityData){
    throw new AppError(httpStatus.NOT_FOUND, 'This facility is not available !');
  }

  let token = req.headers.authorization;
  token = token?.replace("Bearer ", "")
        if (!token) {
            throw new AppError(401, 'You have no access to this route');
        }

        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string
        ) as JwtPayload;

        const { _id } = decoded;

  const start = new Date(`1970-01-01T${req.body?.endTime}`);
  const end = new Date(`1970-01-01T${req.body?.startTime}`);

  const milliSeconds = Number(start) - Number(end)
  
  req.body.payableAmount = (milliSeconds / (1000 * 60 * 60) ) * facilityData?.pricePerHour;
  req.body.user = _id;
  const result = await Booking.create(req.body);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate("user").populate("facility");
  return result;
};

const checkingAvailabilityFromDB = async (req: Request) => {

  const date = req.query.date || new Date().toISOString().split('T')[0];

  const bookings = await Booking.find({ date });

  const bookedSlots = bookings.map((booking) => ({
    startTime: booking?.startTime,
    endTime: booking?.endTime
  }));

  const availableSlots = totalSlots.filter((slot) => {
    let isAvailable = true;

    for(const booked of bookedSlots){
      if(booked.startTime === slot.startTime && booked.endTime === slot.endTime){
        isAvailable = false;
        break;
      }
    }

    return isAvailable;
  })

  return availableSlots;
}

const getAllBookingsForUserFromDB = async (req: Request) => {

  let token = req.headers.authorization;
  token = token?.replace("Bearer ", "")
        if (!token) {
            throw new AppError(401, 'You have no access to this route');
        }

        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string
        ) as JwtPayload;

        const { _id } = decoded;

  const result = await Booking.find({ user: _id}).populate("facility");
  return result;
};


const cancelBookingFromDB = async (id: string) => {
    const result = await Booking.findByIdAndUpdate(
      id,
      { isBooked: 'canceled' },
      {
        new: true,
      },
    );
    return result;
  };

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  checkingAvailabilityFromDB,
  getAllBookingsForUserFromDB,
  cancelBookingFromDB
};