'use strict'

const { param, body} = require('express-validator')

module.exports = {

    completedEvaluation: () => {
        return [
            body('comment').notEmpty().withMessage('comment does not Empty').isString().withMessage
            ('please enter only letters'),
        ];
    },

    detailCompletedEvaluation: () => {
        return [
            param('id').trim().notEmpty().withMessage('id does not Empty').isString().withMessage
            ('please enter only characters'),
        ];
    },

};
