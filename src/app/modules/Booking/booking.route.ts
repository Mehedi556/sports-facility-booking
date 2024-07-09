import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidationSchema } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';



const router = express.Router();

// This route for create booking
router.post(
    '/', 
    auth("user"),
    validateRequest(
    BookingValidationSchema
),
    BookingControllers.createBooking,
);

// This route for get all bookings for user
router.get(
    '/user',
    auth("user"),
    BookingControllers.getAllBookingsForUser,
);

// This route for get all bookings for admin
router.get(
    '/', 
    auth("admin"), 
    BookingControllers.getAllBookings
);

// This route for checking slot availability
router.get(
    '/check-availability', 
    auth("admin", "user"), 
    BookingControllers.checkAvailability
);

// This route for cancel booking
router.delete(
    '/:id', 
    auth("user"), 
    BookingControllers.deleteBooking
);

export const BookingRoutes = router;