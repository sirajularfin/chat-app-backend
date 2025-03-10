import { Router } from 'express';
import { ROUTE_FIND, ROUTE_FIND_BY_ID, ROUTE_REGISTER } from '../constants/routes.js';
import * as userController from '../controllers/user.controller.js';
import registrationFormValidator from '../validators/userRegistration.validator.js';

const router = Router();

router.post(ROUTE_REGISTER, registrationFormValidator, userController.registerUser);
router.get(ROUTE_FIND, userController.getAllUsers);
router.get(ROUTE_FIND_BY_ID, userController.getUserById);

export default router;
