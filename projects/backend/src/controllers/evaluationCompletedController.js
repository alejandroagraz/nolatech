'use strict'

const { validationResult } = require("express-validator");
const {listCompleted, detailCompleted, submit, reportEmployed, reportDepartment} = require("../services/evaluationCompletedService");

module.exports = {

    listCompleted: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            const evaluationCompletes =  await listCompleted();

            return res.status(200).send({
                status: 'Success',
                data: evaluationCompletes
            });
        } catch (err) {
            next(err);
        }
    },

    detailCompleted: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }

            return await detailCompleted(req, res);
        } catch (err) {
            next(err);
        }
    },

    submit: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }

            return await submit(req, res);

        } catch (err) {
            next(err);
        }
    },

    reportEmployed: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }

            return await reportEmployed(req, res);
        } catch (err) {
            next(err);
        }
    },

    reportDepartment: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }

            return await reportDepartment(req, res);
        } catch (err) {
            next(err);
        }
    },

};
