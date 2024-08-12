'use strict'

const sanitize = require('mongo-sanitize');
const moment = require("moment/moment");
const {getOneEvaluation} = require("../repositories/evaluationRepository");
const Status = require("../common/constants/status");
const Question = require('../models/question');

module.exports = {

    // List all question
    list: async () => {
        return await Question.find().exec();
    },

    // Get one question
    detail: async (req, res) => {
        try {
            const _id = sanitize(req.params.id);
            const question = await Question.findOne({_id}).exec();

            if (!question)
                return res.status(404).send({
                    status: 'error',
                    message: `Question: ${_id} not found`
                });

            return res.status(200).send({
                status: 'success',
                data: question
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

    // Register one question
    register: async (req, res) => {
        try {
            const isEvaluation = await getOneEvaluation(req.body.evaluation_id);

            if (!isEvaluation)
                return res.status(404).send({
                    status: 'error',
                    message: `Evaluation: ${req.body.evaluation_id} not found`
                });

            if (moment(isEvaluation.endDate).format('YYYY/MM/DD HH:mm:ss') < moment().format('YYYY/MM/DD HH:mm:ss')
                || isEvaluation.status === Status.inactive) {
                return res.status(403).send({
                    status: 'error',
                    message: `Evaluation: ${req.body.evaluation_id} is not active or its date has expired`
                });
            }


            const newQuestion = new Question();
            newQuestion.question = sanitize(req.body.question);
            newQuestion.evaluation = isEvaluation;
            const question = await newQuestion.save(newQuestion);

            return res.status(201).send({
                status: 'Success',
                message: 'Question registered successfully.',
                data: question,
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

    // update one question
    update: async (req, res) => {
        try {
            let evaluation = false;
            const _id = sanitize(req.params.id);
            const isQuestion = await Question.findOne({_id}).populate('evaluation').exec();

            if (!isQuestion)
                return res.status(404).send({
                    status: 'error',
                    message: `Question: ${_id} not found`
                });

            if (req.body.evaluation_id) {
                const isEvaluation = await getOneEvaluation(req.body.evaluation_id);
                if (!isEvaluation) {
                    return res.status(404).send({
                        status: 'error',
                        message: `Evaluation: ${req.body.evaluation_id} not found`
                    });
                }

                if (moment(isEvaluation.endDate).format('YYYY/MM/DD HH:mm:ss') < moment().format('YYYY/MM/DD HH:mm:ss')
                    || isEvaluation.status === Status.inactive) {
                    return res.status(403).send({
                        status: 'error',
                        message: `Evaluation: ${req.body.evaluation_id} is not active or its date has expired`
                    });
                }

                evaluation = isEvaluation || isQuestion.evaluation;
            } else {
                evaluation = isQuestion.evaluation;
            }

            const question = req.body.question ? sanitize(req.body.question) : isQuestion.question;

            const resp = await Question.findByIdAndUpdate({_id}, {
                question,
                evaluation
            }).populate('evaluation').exec();

            return res.status(201).send({
                status: 'Success',
                message: 'Question update successfully.',
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
