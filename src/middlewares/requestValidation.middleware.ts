import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import HttpStatus from '../constants/httpStatus.js';

/**
 * Middleware to validate the request body
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function
 */
const requestValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
    return;
  }
  next();
};

export default requestValidationMiddleware;
