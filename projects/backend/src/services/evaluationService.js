'use strict'

const sanitize = require('mongo-sanitize');
const moment = require('moment');
const {getQuestionsByIdEvaluation} = require("../repositories/questionRepository");
const {getOneDepartment} = require("../repositories/departmentRepository");
const {formatData} = require("../common/validators/formatData");
const Evaluation = require('../models/evaluation');

module.exports = {

    list: async () => {
        return await Evaluation.find().exec();
    },

    detail: async (req, res) => {
        try {
            const _id = sanitize(req.params.id);
            const evaluation = await Evaluation.findOne({_id}).exec();

            if (!evaluation)
                return res.status(404).send({
                    status: 'error',
                    message: `Evaluation: ${_id} not found`
                });

            const questions = await getQuestionsByIdEvaluation(_id);
            const response = formatData(evaluation, questions, 'questions')

            return res.status(200).send({
                status: 'success',
                data: response
            });
        } catch (err) {
            res.status(400).send(
                {
                    status: 'error',
                    message: err.message
                }
            )
        }
    },

    register: async (req, res) => {
        try {
            const isDepartment = await getOneDepartment(req.body.department_id);

            if (!isDepartment)
                return res.status(404).send({
                    status: 'error',
                    message: `Department: ${req.body.department_id} not found`
                });

            const newEvaluation = new Evaluation();
            newEvaluation.title = sanitize(req.body.title);
            newEvaluation.startDate = moment(sanitize(req.body.startDate)).format('YYYY/MM/DD HH:mm:ss');
            newEvaluation.endDate = moment(sanitize(req.body.endDate)).format('YYYY/MM/DD HH:mm:ss');
            newEvaluation.status = sanitize(req.body.status);
            newEvaluation.department = isDepartment;

            const evaluation = await newEvaluation.save(newEvaluation);

            return res.status(201).send({
                status: 'Success',
                message: 'Evaluation registered successfully.',
                data: evaluation,
            });

        } catch (err) {
            res.status(400).send(
                {
                    status: 'error',
                    message: err.message
                }
            )
        }
    },

    update: async (req, res) => {
        try {
            let department = false;
            const _id = sanitize(req.params.id);
            const isEvaluation = await Evaluation.findOne({_id}).exec();

            if (!isEvaluation)
                return res.status(404).send({
                    status: 'error',
                    message: `Evaluation: ${_id} not found`
                });

            if (req.body.department_id) {
                const isDepartment = await getOneDepartment(req.body.department_id);
                if (!isDepartment) {
                    return res.status(404).send({
                        status: 'error',
                        message: `Department: ${req.body.department_id} not found`
                    });
                }

                department = isDepartment || isEvaluation.department;
            } else {
                department = isEvaluation.department;
            }

            const title = req.body.title ? sanitize(req.body.title) : isEvaluation.title;
            const startDate = req.body.startDate ? sanitize(req.body.startDate) : isEvaluation.startDate;
            const endDate = req.body.endDate ? sanitize(req.body.endDate) : isEvaluation.endDate;
            const status = req.body.status ? sanitize(req.body.status) : isEvaluation.status;

            const resp = await Evaluation.findByIdAndUpdate({_id}, {
                title,
                startDate,
                endDate,
                status,
                department
            }).exec();

            return res.status(201).send({
                status: 'Success',
                message: 'Evaluation update successfully.',
                data: resp,
            });

        } catch (err) {
            res.status(400).send(
                {
                    status: 'error',
                    message: err.message
                }
            )
        }
    },

};
