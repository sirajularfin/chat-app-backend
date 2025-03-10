import User from '../schemas/user.schema.js';
import HttpStatus from '../constants/httpStatus.js';
import { Request, Response, NextFunction } from 'express';
import { checkRequestErrors } from '../utils/commons.util.js';

/**
 * Registers a new user
 * @param req
 * @param res
 * @param next
 */
export const registerUser = (req: Request, res: Response, next: NextFunction) => {
  checkRequestErrors(req, res);

  const { firstName, lastName, email, password } = req.body;
  const user = new User({ firstName, lastName, email, password });
  user
    .save()
    .then(response => {
      res.status(HttpStatus.CREATED).json(response);
    })
    .catch(err => {
      res.status(HttpStatus.BAD_REQUEST).json({ error: err });
    });
};

/**
 * Fetches all users
 * @param req
 * @param res
 * @param next
 */
export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  const users = User.find()
    .then(users => {
      res.status(HttpStatus.OK).json(users);
    })
    .catch(err => {
      res.status(HttpStatus.BAD_REQUEST).json({ error: err });
    });
};
