import { body } from 'express-validator';

let validation_mw_course = ()=> {
    return [
        body('name').notEmpty(),
        body('price').notEmpty()
    ]
}

let validation_mw_login = ()=> {
    return [
        body('email').notEmpty(),
        body('password').notEmpty()
    ]
}

export {
    validation_mw_course,
    validation_mw_login
};