'use strict'

const { body } = require('express-validator')
const Role = require("../constants/role");

module.exports = {

    loginUser: () => {
        return [
            body('username').notEmpty().withMessage
            ('this username is required'),
            body('password').trim().not().isEmpty().withMessage
            ('this password is required'),
        ];
    },

    registerUser: () => {
        return [
            body('firstname').trim().notEmpty().withMessage('firstname does not Empty').isString().withMessage
            ('please enter only letters'),
            body('lastname').trim().notEmpty().withMessage('lastname does not Empty').isString().withMessage
            ('please enter only characters'),
            body('dni').trim().notEmpty().withMessage('dni does not Empty').isInt().withMessage
            ('please enter numbers').isLength({min: 8, max: 10}).withMessage
            ('dni can not be less than 8 and must be more than 10'),
            body('email').trim().notEmpty().withMessage('email does not Empty').isEmail().withMessage('Invalid format email'),
            body('username').trim().notEmpty().withMessage('username does not Empty').isLength({min: 3}).withMessage('Length error for dni min 3'),
            body('password').notEmpty().withMessage('password does not Empty')
                .isLength({min: 8}).withMessage('The minimum password length is 8 characters')
                .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
                .withMessage('At least 1 upper case letter, 1 lower case letter, 1 number or special character and min length 8 character'),
        ];
    }

};
