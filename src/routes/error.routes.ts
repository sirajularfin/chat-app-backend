import { Router } from 'express';
import { ROUTE_ROOT } from '../constants/routes.js';
import * as errorController from '../controllers/error.controller.js';

const router = Router();

router.use(ROUTE_ROOT, errorController.get404Page);

export default router;
