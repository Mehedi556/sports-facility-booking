import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLogin, TSignup } from "./auth.interface";
import { User } from "./auth.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from "../../config";


// this service is created for create new user
const createUserIntoDB = async (payload:TSignup) => {
    const newUser = await User.create(payload);
    return newUser;
}

// this service is created for login user
const loginUser = async (payload:TLogin) => {
    const { email, password } = payload;

    const userExists = await User.findOne({ email }).select('+password');
    // finding user. If user is not found then throw error

    if (!userExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    const passwordMatched = await bcrypt.compare(password, userExists?.password)
    // matching password. if not matched then throw error.

    if (!passwordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid Password');
    }

    const jwtPayload = {
        _id: userExists?._id,
        email: userExists?.email,
        role: userExists?.role
    }

    const accessToken = jwt.sign(
        jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });

    return {
        token: accessToken,
        data: {
            _id: userExists?._id,
            name: userExists?.name,
            email: userExists?.email,
            phone: userExists?.phone,
            role: userExists?.role,
            address: userExists?.address,
        }
        
    };
}



export const AuthServices = {
    createUserIntoDB,
    loginUser
}