import User from '../schemas/user.schema.js';
import HttpStatus from '../constants/httpStatus.js';
import { Request, Response, NextFunction } from 'express';
import { checkRequestErrors } from '../utils/commons.util.js';

/**
 * Controller to register a new user
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
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
 * Controller to fetch all users
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
 */
export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .then(users => {
      res.status(HttpStatus.OK).json(users);
    })
    .catch(err => {
      res.status(HttpStatus.BAD_REQUEST).json({ error: err });
    });
};

/**
 * Controller to fetch a user by ID
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
 */
export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then(users => {
      res.status(HttpStatus.OK).json(users);
    })
    .catch(() => {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'User with given id was not found' });
    });
};
