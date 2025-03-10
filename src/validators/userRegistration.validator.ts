import { body } from 'express-validator';

const registrationFormValidator = [
	body('firstName').isLength({ min: 5 }).withMessage('First name must be at least 5 characters long'),
	body('lastName').isLength({ min: 5 }).withMessage('Last name must be at least 5 characters long'),
	body('email').isEmail().withMessage('Invalid email format'),
	body('password').isStrongPassword().withMessage('Password must be strong. It should be alphanumeric with symbols.'),
	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Passwords do not match');
		}
		return true;
	}),
];

export default registrationFormValidator;
