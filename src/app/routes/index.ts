import { Router } from "express";
import { FacilityRoutes } from "../modules/Facility/facility.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

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
]

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;