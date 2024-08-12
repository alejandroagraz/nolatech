'use strict'

const { body } = require('express-validator')

module.exports = {

    registerDepartment: () => {
        return [
            body('name').notEmpty().withMessage('name does not Empty').isString().withMessage
            ('please enter only letters'),
            body('description').notEmpty().withMessage('description does not Empty').isString().withMessage
            ('please enter only characters'),
            body('manager_id').trim().notEmpty().withMessage('manager_id does not Empty').isString().withMessage
            ('please enter only characters'),
        ];
    },

};
