'use strict'

const { body, param } = require('express-validator')
const Status = require("../constants/status");

module.exports = {

    detailQuestion: () => {
        return [
            param('id').trim().notEmpty().withMessage('id does not Empty').isString().withMessage
            ('please enter only characters'),
        ];
    },

    registerQuestion: () => {
        return [
            body('question').notEmpty().withMessage('question does not Empty').isString().withMessage
            ('please enter only letters'),
            body('evaluation_id').trim().notEmpty().withMessage('evaluation_id does not Empty').isString().withMessage
            ('please enter only characters'),

        ];
    },

    updateQuestion: () => {
        return [
            body('question').optional().isString().withMessage
            ('please enter only letters'),
            body('evaluation_id').optional().trim().isString().withMessage
            ('please enter only characters'),
        ];
    }

};
