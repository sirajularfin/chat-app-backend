import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} from '../constants/httpStatus.js';
import { validationResult } from 'express-validator';
import User from '../models/user.model.js';

/**
 *
 * @param req
 * @param res
 * @param next
 */
export const registerUser = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS_BAD_REQUEST).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  const user = new User(firstName, lastName, email, password);
  user
    .save()
    .then(response => {
      res.status(HTTP_STATUS_CREATED).json(response);
    })
    .catch(err => {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: err });
    });

  // res.status(HTTP_STATUS_CREATED).json({
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  //   createdAt: new Date().toISOString(),
  // });
};

export const loginUser = (req: any, res: any, next: any) => {
  res.status(HTTP_STATUS_OK).json({
    users: [{ name: 'Sirajul Arfin', rollNo: '20MCA058' }],
  });
};

export const getAllUsers = (req: any, res: any, next: any) => {
  const users = User.fetchAll()
    .then(users => {
      res.status(HTTP_STATUS_OK).json(users);
    })
    .catch(err => {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: err });
    });
};
