import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidationSchema } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';



const router = express.Router();

router.post(
    '/',
    auth("user"),
    validateRequest(
    BookingValidationSchema
),
    BookingControllers.createBooking,
);


router.get(
'/user',
auth("user"),
    BookingControllers.getAllBookingsForUser,
);

router.get('/', auth("admin"), BookingControllers.getAllBookings);

router.get('/check-availability', 
    // auth("admin", "user"), 
    BookingControllers.checkAvailability);

router.delete('/:id', auth("user"), BookingControllers.deleteBooking);

export const BookingRoutes = router;