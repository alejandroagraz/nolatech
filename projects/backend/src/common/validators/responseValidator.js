'use strict'

const { body } = require('express-validator')

module.exports = {

    registerResponse: () => {
        return [
            body('response').notEmpty().withMessage('response does not Empty').isString().withMessage
            ('please enter only letters'),
            body('question_id').trim().notEmpty().withMessage('question_id does not Empty').isString().withMessage
            ('please enter only characters'),
        ];
    },

    verifyResponse: () => {
        return [
            body('isCorrect').notEmpty().withMessage('isCorrect does not Empty').isBoolean().withMessage
            ('please enter only boolean'),
        ];
    },

};
