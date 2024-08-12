'use strict'

const { body, param } = require('express-validator')
const Status = require("../constants/status");
const Gender = require("../constants/gender");

module.exports = {

    detailManager: () => {
        return [
            param('id').trim().notEmpty().withMessage('id does not Empty').isString().withMessage
            ('please enter only characters'),
        ];
    },

    registerManager: () => {
        return [
            body('firstname').notEmpty().withMessage('firstname does not Empty').isString().withMessage
            ('please enter only letters'),
            body('lastname').notEmpty().withMessage('lastname does not Empty').isString().withMessage
            ('please enter only characters'),
            body('dni').trim().notEmpty().withMessage('dni does not Empty').isInt().withMessage
            ('please enter numbers').isLength({min: 8, max: 10}).withMessage
            ('dni can not be less than 8 and must be more than 10'),
            body('gender').trim().notEmpty().withMessage('gender does not Empty').isIn(Gender).withMessage
            ('You must specify a gender (man, women, other)'),
            body('address').notEmpty().withMessage('address does not Empty').isString().withMessage
            ('please enter only characters'),
            body('email').trim().notEmpty().withMessage('email does not Empty').isEmail().withMessage('Invalid format email'),
            body('username').trim().notEmpty().withMessage('username does not Empty').isLength({min: 3}).withMessage('Length error for dni min 3').isAlphanumeric(),
            body('password').notEmpty().withMessage('password does not Empty')
                .isLength({min: 8}).withMessage('The minimum password length is 8 characters')
                .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
                .withMessage('At least 1 upper case letter, 1 lower case letter, 1 number or special character and min length 8 character'),
        ];
    },

    updateManager: () => {
        return [
            body('firstname').optional().isString().withMessage
            ('please enter only letters'),
            body('lastname').optional().isString().withMessage
            ('please enter only characters'),
            body('dni').optional().trim().isInt().withMessage
            ('please enter numbers').isLength({min: 8, max: 10}).withMessage
            ('dni can not be less than 8 and must be more than 10'),
            body('gender').optional().trim().isIn(Gender).withMessage
            ('You must specify a gender (man, women, other)'),
            body('address').optional().isString().withMessage
            ('please enter only characters'),
            body('email').optional().trim().isEmail().withMessage('Invalid format email'),
            body('username').optional().trim().isLength({min: 3}).withMessage('Length error for dni min 3').isAlphanumeric(),
        ];
    },

};
