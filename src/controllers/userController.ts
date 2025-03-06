import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED, HTTP_STATUS_OK } from '../constants/httpStatus.js';

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

	const { firstName, lastName, email, password, confirmPassword } = req.body;
	res.status(HTTP_STATUS_CREATED).json({
		_id: uuidv4(),
		firstName,
		lastName,
		email,
		password,
		createdAt: new Date().toISOString(),
	});
};

export const loginUser = (req: any, res: any, next: any) => {
	res.status(HTTP_STATUS_OK).json({
		users: [{ name: 'Sirajul Arfin', rollNo: '20MCA058' }],
	});
};

export const getAllUsers = (req: any, res: any, next: any) => {
	res.send('<p>User!</p>');
	res.end();
};
