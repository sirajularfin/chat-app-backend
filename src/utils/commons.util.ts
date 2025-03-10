import { Request, Response } from 'express';
import logger from './logger.util.js';
import { validationResult } from 'express-validator';
import HttpStatus from '../constants/httpStatus.js';

export const formatJson = (args: undefined): string => {
  try {
    const jsonString = typeof args === 'string' ? args : JSON.stringify(args);
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    logger(`[JSON Formatting] Invalid JSON: ${e}`, 'error');
    return String(args);
  }
};

export const checkIfPostOrPutRequest = (req: Request): boolean => {
  return req.method === 'POST' || req.method === 'PUT';
};

export const checkRequestErrors = (req: Request, res: Response) => {
  if (checkIfPostOrPutRequest(req)) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }
  }
};
