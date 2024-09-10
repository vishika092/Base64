import { body, validationResult, param } from 'express-validator';


// @route  : /api/user/register
function signUpValidator() {
    return [
        body('name')
            .isLength({ min: 3 }).withMessage('The first name must be a string with at least 3 characters.'),

        body('email')
            .isEmail().withMessage('Invalid email.'),

        body('password')
            .isAlphanumeric().withMessage('The password must be alphanumeric.')
            .isLength({ min: 8, max: 16 }).withMessage('The password must be a string with 8 to 16 characters.'),

        body('phone')
            .isMobilePhone('en-IN', { strictMode: true })
            .withMessage('The phone number must have 10 digits following +91 country code.')
    ];
}

// @route  : /api/user/login
function logInValidator() {
    return [
        body('email')
            .isEmail().withMessage('Invalid email.'),

        body('password')
            .notEmpty().withMessage('Enter your password.')
    ];
}

function taskValidator(){
    return [
        body("task").isString().isLength({ min: 5 }).withMessage('The task must be a string with at least 5 characters.'),

        body("deadline")
            .custom((dateString, {req}) => {
                // Verify the deadline string is a valid date
                const parsedDate = Date.parse(dateString);
                if (!parsedDate) return false;

                const deadline = new Date(dateString);
                const currDate = new Date();
                const diffInMilliseconds = deadline - currDate;
                const diffInMinutes = diffInMilliseconds / (1000 * 60);
                const diffInDays = diffInMinutes / (60 * 24);

                // Ensure deadline is in the future (more than 2 minutes) and within the next 30 days
                return diffInMinutes > 1 && diffInDays <= 30;
            })
            .withMessage('Deadline cannot be backdated, within the next 15 mins, or beyond 30 days.')
    ]
}

function addTaskValidator(){
    return taskValidator();
}

function taskIdValidator() {
    return param('taskid')
        .isLength({ min: 24, max: 24 }).withMessage('taskid must be a 24-character hex string.');
}

function editTaskValidator() {
    return [
        ...taskValidator(),

        body('status')
            .isBoolean().withMessage('status must be true or false.')
    ];
}


function validationErrorHandler(req, res, next) {
    const reqErrors = validationResult(req);

    if (!reqErrors.isEmpty()) {
        return res.status(400).json(reqErrors);
    }
    next();
}
export { signUpValidator, logInValidator, validationErrorHandler, addTaskValidator , taskIdValidator, editTaskValidator};
