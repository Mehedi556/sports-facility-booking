import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLogin, TSignup } from "./auth.interface";
import { User } from "./auth.model";
import bcrypt from 'bcrypt';

const createUserIntoDB = async (payload:TSignup) => {
    const newUser = await User.create(payload);
    return newUser;
}

const loginUser = async (payload:TLogin) => {
    const { email, password } = payload;
    const userExists = await User.findOne({ email })
    .select('+password');
    if (!userExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    const passwordMatched = await bcrypt.compare(password, userExists?.password)

    if (!passwordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid Password');
    }
    return {
        _id: userExists?._id,
        name: userExists?.name,
        email: userExists?.email,
        phone: userExists?.phone,
        role: userExists?.role,
        address: userExists?.address,
    };
}



export const AuthServices = {
    createUserIntoDB,
    loginUser
}