import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  
    const result = await AuthServices.createUserIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User registered successfully',
      data: {
          _id: result?._id,
          name: result?.name,
          email: result?.email,
          phone: result?.phone,
          role: result?.role,
          address: result?.address,
      },
    });
  });

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        token: result?.token,
        data: result?.data
    });
});


export const AuthControllers = {
    createUser,
    loginUser,
};
