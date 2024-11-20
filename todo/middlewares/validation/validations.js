import { body, validationResult } from 'express-validator';

export const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('phone').isNumeric().withMessage('Phone must be numeric'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Email must be valid'),
];

export const taskValidation =  [
  body("tasks").isArray().notEmpty().withMessage("Tasks required"),
  body("tasks.*")
    .isString()
    .notEmpty()
    .withMessage("Task Description Required !"),
];

export const editTaskValidation = [
  body('task').optional().notEmpty().withMessage('Task description cannot be empty'),
  body('isCompleted').optional().isBoolean().withMessage('isCompleted must be a boolean'),
];

export function validationErrorResult(req, res, next) {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
      errors = errors.errors.reduce((acc, err) => {
               acc[err.path] = err.msg;
               return acc;
      }, {});
      
    return res.status(200).json({ validationErr : errors});
  }
 next()
}
