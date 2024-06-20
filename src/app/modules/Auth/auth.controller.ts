import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  
    const result = await AuthServices.createUserIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  });

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: {
            result
        },
    });
});


export const AuthControllers = {
    createUser,
    loginUser,
};
