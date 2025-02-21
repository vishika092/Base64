import {body, validationResult} from "express-validator"

const languageValidation = [
    body("language")
    .notEmpty().withMessage("Language cannot be empty")
    .isIn( ["js", "c", "cpp", "java", "py", "rb", "sh"]).withMessage(`Language not allowed`),

  
]


function validationCheck(req, res, next){
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();

}

export {languageValidation, validationCheck};