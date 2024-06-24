import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { TUserRoles } from "../modules/Auth/auth.interface";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { User } from "../modules/Auth/auth.model";

const auth = (...requiredRoles: TUserRoles[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        let token = req.headers.authorization;
        token = token?.replace("Bearer ", "")

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
        }

        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string
        ) as JwtPayload;

        const { role, _id } = decoded;

        const user = await User.findById(_id);
        if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
        }

        if(requiredRoles && !requiredRoles.includes(role)) {
           throw new AppError(
                 httpStatus.UNAUTHORIZED,
                 'You are not a authorized user!!',
             );
         }

         req.user = decoded as JwtPayload;
        next();
    })
};

export default auth;