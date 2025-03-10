import { NextFunction, Request, Response } from 'express';
import { formatJson } from '../utils/commons.util.js';
import logger from '../utils/logger.util.js';

/**
 * Middleware to set the HTTP headers for the response
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function
 */
const httpHeadersMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    logger(`[ApiRequest] Body: ${formatJson(req.body)}`);
  }

  // Set the headers for CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

export default httpHeadersMiddleware;
