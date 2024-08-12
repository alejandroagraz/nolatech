'use strict'

const { body, param } = require('express-validator')
const Status = require("../constants/status");

module.exports = {

    detailEvaluation: () => {
        return [
            param('id').trim().notEmpty().withMessage('id does not Empty').isString().withMessage
            ('please enter only characters'),
        ];
    },

    registerEvaluation: () => {
        return [
            body('title').notEmpty().withMessage('firstname does not Empty').isString().withMessage
            ('please enter only letters'),
            body('startDate').notEmpty().withMessage('startDate does not Empty').isDate().withMessage
            ('please enter only date'),
            body('endDate').notEmpty().withMessage('endDate does not Empty').isDate().withMessage
            ('please enter only date'),
            body('status').trim().notEmpty().withMessage('status does not Empty').isIn(Status).withMessage
            ('You must specify a status (active, inactive)'),
            body('department_id').optional().trim().isString().withMessage
            ('please enter only characters'),
        ];
    },

    updateEvaluation: () => {
        return [
            body('title').optional().isString().withMessage
            ('please enter only letters'),
            body('startDate').optional().isDate().withMessage
            ('please enter only date'),
            body('endDate').optional().isDate().withMessage
            ('please enter only date'),
            body('status').optional().trim().isIn(Status).withMessage
            ('You must specify a status (active, inactive)'),
            body('department_id').optional().trim().isString().withMessage
            ('please enter only characters'),
        ];
    },

};
