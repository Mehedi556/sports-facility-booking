import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";


const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const getAllFacilitiesFromDB = async () => {
  const result = await Facility.find({ isDeleted: false });
  return result;
};


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