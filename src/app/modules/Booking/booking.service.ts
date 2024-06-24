import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Facility } from "../Facility/facility.model";
import { Booking } from "./booking.model";
import { Request } from "express";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";



const createBookingIntoDB = async (req: Request) => {
  const facilityData = await Facility.findById(req.body?.facility)
  if(!facilityData){
    throw new AppError(httpStatus.NOT_FOUND, 'This facility is not available !');
  }

  let token = req.headers.authorization;
  token = token?.replace("Bearer ", "")
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
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
  console.log(req.query);

}

const getAllBookingsForUserFromDB = async (req: Request) => {

  let token = req.headers.authorization;
  token = token?.replace("Bearer ", "")
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
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