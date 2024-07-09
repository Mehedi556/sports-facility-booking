import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Facility } from "../Facility/facility.model";
import { Booking } from "./booking.model";
import { Request } from "express";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const totalSlots = [
  { startTime: "06:00", endTime: "07:00" },
  { startTime: "07:00", endTime: "08:00" },
  { startTime: "08:00", endTime: "09:00" },
  { startTime: "09:00", endTime: "10:00" },
  { startTime: "10:00", endTime: "11:00" },
  { startTime: "11:00", endTime: "12:00" },
  { startTime: "12:00", endTime: "13:00" },
  { startTime: "13:00", endTime: "14:00" },
  { startTime: "14:00", endTime: "15:00" },
  { startTime: "15:00", endTime: "16:00" },
  { startTime: "16:00", endTime: "17:00" },
  { startTime: "17:00", endTime: "18:00" },
  { startTime: "18:00", endTime: "19:00" },
  { startTime: "19:00", endTime: "20:00" }
]

// This service created for create new booking into DB
const createBookingIntoDB = async (req: Request) => {
  // firstly I'm trying to find the facility data by facility id which is coming with booking data. if data not found by this id then throwing error.
  const facilityData = await Facility.findById(req.body?.facility)
  req.body.isBooked = 'confirmed';

  if(!facilityData){
    throw new AppError(httpStatus.NOT_FOUND, 'This facility is not available !');
  }

  // then I'm trying to check the token. if not valid then throwing error
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
  
  // here I'm trying to find out payableAmount by start and end time. 
  const start = new Date(`1970-01-01T${req.body?.endTime}`);
  const end = new Date(`1970-01-01T${req.body?.startTime}`);

  const milliSeconds = Number(start) - Number(end)
  
  req.body.payableAmount = (milliSeconds / (1000 * 60 * 60) ) * facilityData?.pricePerHour;
  req.body.user = _id;

  // here I'm creating new booking.
  const result = await Booking.create(req.body);
  return result;
};


// This service created for get all bookings for admin from DB
const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate("user").populate("facility");
  return result;
};


// This service created for checking available slots into DB
const checkingAvailabilityFromDB = async (req: Request) => {

  // First I'm trying to store a date in variable. If user not sending specific date then I'm storing todays date by default.
  const date = req.query.date || new Date().toISOString().split('T')[0];

  // then trying to find data from DB by that predefined date
  const bookings = await Booking.find({ date, isBooked: 'confirmed' });

  // then I'm converting booked all data by only startTime and endTime like [ { startTime: "10:00", endTime: "12:00"}, { startTime: "13:00", endTime: "16:00"} ]
  const bookedSlots = bookings.map((booking) => ({
    startTime: booking?.startTime,
    endTime: booking?.endTime
  }));

  const availableSlots = totalSlots.filter((slot) => {
    let isAvailable = true;

    for(const booked of bookedSlots){
      const bookedStartTime = new Date(`1970-01-01T${booked.startTime}:00Z`);
      const bookedEndTime = new Date(`1970-01-01T${booked.endTime}:00Z`);
      const slotStartTime = new Date(`1970-01-01T${slot.startTime}:00Z`);
      const slotEndTime = new Date(`1970-01-01T${slot.endTime}:00Z`);

      // In the if statement I tried to filter available slots. The logic is that, the booked slot will be ends before current slot start and also the booked slot starts after the current slot ends. So if this two conditions or any one condition is true, then it will not overlap. so I'm checking for overlap by the reversing non-overlapping condition so It will give overlap slots. When overlap slot will come then isAvailable will be set to false and loop will break. It means that the slot is not available.

      if(!(bookedEndTime <= slotStartTime || bookedStartTime >= slotEndTime)){
        isAvailable = false;
        break;
      }
    }

    return isAvailable;
  })

  return availableSlots;
}


// This service created for get all bookings for user from DB
const getAllBookingsForUserFromDB = async (req: Request) => {

  // checking token
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

// This service created for cancel booking into DB
const cancelBookingFromDB = async (id: string) => {
  // finding the data by id then soft delete
    const result = await Booking.findByIdAndUpdate(
      id,
      { isBooked: 'canceled' },
      {
        new: true,
      },
    ).populate('facility');
    return result;
  };

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  checkingAvailabilityFromDB,
  getAllBookingsForUserFromDB,
  cancelBookingFromDB
};