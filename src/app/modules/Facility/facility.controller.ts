import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { FacilityServices } from './facility.service';
import catchAsync from '../../utils/catchAsync';
import noDataFoundResponse from '../../utils/noDataFoundResponse';

// This controller is for create Facility.
const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});

// This controller is for get all facilities Facility.
const getAllFacilities = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilitiesFromDB();

  // checking if the length of data is less then 1 then it will show (No data found) response.
  if(result?.length < 1){
    noDataFoundResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: result
    })
  } else {
    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    data: result,
  });
  }

  
});

// This controller is for update Facility.
const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.updateFacilityIntoDB(id, req.body);

  if(!result){
    noDataFoundResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: result
    })
  } else{
    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility updated successfully',
    data: result,
  });
}

  
});

// This controller is for delete Facility.
const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.deleteFacilityFromDB(id);

  if(!result){
    noDataFoundResponse(res, {
      success: false,
      statusCode: 404,
      message: "No Data Found",
      data: result
    })
  }else {
    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility deleted successfully',
    data: result,
  });
  }

  
});

export const FacilityControllers = {
    createFacility,
    getAllFacilities,
    updateFacility,
    deleteFacility,
  };