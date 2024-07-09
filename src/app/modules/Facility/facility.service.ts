import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

// this service is for create facility into db
const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

// this service is for get all facilities from db
const getAllFacilitiesFromDB = async () => {
  const result = await Facility.find({ isDeleted: false });
  return result;
};

// this service is for update facility into db
const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const result = await Facility.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

// this service is for soft delete facility into db
const deleteFacilityFromDB = async (id: string) => {
    const result = await Facility.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
      },
    );
    return result;
  };

export const FacilityServices = {
  createFacilityIntoDB,
  getAllFacilitiesFromDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB
};