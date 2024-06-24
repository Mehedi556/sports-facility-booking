import { Router } from "express";
import { FacilityRoutes } from "../modules/Facility/facility.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { BookingRoutes } from "../modules/Booking/booking.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/facility',
        route: FacilityRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/bookings',
        route: BookingRoutes
    },
    {
        path: '/',
        route: BookingRoutes
    },
]

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;