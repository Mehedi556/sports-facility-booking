
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { LoginValidationSchema, SignupValidationSchema } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

// this route is created for create user
router.post(
  '/signup',
  validateRequest(SignupValidationSchema),
  AuthControllers.createUser,
);

// this route is created for login user
router.post(
  '/login',
  validateRequest(LoginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;