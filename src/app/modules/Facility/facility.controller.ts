import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { FacilityServices } from './facility.service';
import catchAsync from '../../utils/catchAsync';

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility is created successfully',
    data: result,
  });
});

const getAllFacilities = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilitiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities are retrieved successfully',
    data: result,
  });
});


const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.updateFacilityIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility is updated successfully',
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.deleteFacilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility is deleted successfully',
    data: result,
  });
});

export const FacilityControllers = {
    createFacility,
    getAllFacilities,
    updateFacility,
    deleteFacility,
  };