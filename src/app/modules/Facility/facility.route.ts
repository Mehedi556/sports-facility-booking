import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidationSchema } from './facility.validation';
import { FacilityControllers } from './facility.controller';



const router = express.Router();

router.post(
  '/',
  validateRequest(
    FacilityValidationSchema.CreateValidationSchema
  ),
  FacilityControllers.createFacility,
);


router.patch(
  '/:id',
  validateRequest(
    FacilityValidationSchema.UpdateValidationSchema
  ),
  FacilityControllers.updateFacility,
);

router.get('/', FacilityControllers.getAllFacilities);

router.delete('/:id', FacilityControllers.deleteFacility);

export const FacilityRoutes = router;