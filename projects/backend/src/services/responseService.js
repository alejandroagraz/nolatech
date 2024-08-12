'use strict'

const sanitize = require('mongo-sanitize');
const moment = require('moment');
const {countResponsesVerifyByIdEvaluationEmployed} = require("../repositories/responseRepository");
const {getOneQuestion} = require("../repositories/questionRepository");
const {getOnEmployedByIdUser} = require("../repositories/employedRepository");
const CompletedEvaluationEmitter = require("../events/completedEvaluation");
const Status = require("../common/constants/status");
const Response = require('../models/response');

module.exports = {

    // List all response
    list: async () => {
        return await Response.find().exec();
    },

    // Register one response
    register: async (req, res) => {
        try {
            const isQuestion = await getOneQuestion(req.body.question_id);

            if (!isQuestion)
                return res.status(404).send({
                    status: 'error',
                    message: `Question: ${req.body.question_id} not found`
                });

            if (
                isQuestion.evaluation.status === Status.inactive
                || moment(isQuestion.evaluation.endDate).format('YYYY/MM/DD HH:mm:ss') <= moment().format('YYYY/MM/DD HH:mm:ss')
            ) {
                return res.status(403).send({
                    status: 'error',
                    message: 'Your evaluation has expired',
                });
            }

            const employed = await getOnEmployedByIdUser(req.user.userId);
            const isResponseQuestion = await Response.findOne({question: req.body.question_id, employed}).exec();

            if (isResponseQuestion)
                return res.status(403).send({
                    status: 'error',
                    message: 'You have already answered this question previously.',
                });

            const newResponse = new Response();

            newResponse.response = sanitize(req.body.response);
            newResponse.question = isQuestion;
            newResponse.evaluation = isQuestion.evaluation;
            newResponse.employed = employed;
            const response = await newResponse.save(newResponse);

            return res.status(201).send({
                status: 'Success',
                message: 'Response registered successfully.',
                data: response,
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

    verify: async (req, res) => {
        try {
            const _id = sanitize(req.params.id);
            const isResponse = await Response.findOne({_id}).exec();

            if (!isResponse)
                return res.status(404).send({
                    status: 'error',
                    message: `Response: ${_id} not found`
                });

            if (isResponse.isVerified)
                return res.status(403).send({
                    status: 'error',
                    message: `This answer has already been previously verified.`
                });

            const isCorrect = req.body.isCorrect;
            const isVerified = true;

            const resp = await Response.findByIdAndUpdate({_id}, {
                isCorrect,
                isVerified,
            }).exec();

            const countResponseVerify = await countResponsesVerifyByIdEvaluationEmployed(isResponse.evaluation, isResponse.employed);
            const countTotalResponse = await Response.countDocuments({evaluation: isResponse.evaluation, employed: isResponse.employed}).exec();

            if (countResponseVerify === countTotalResponse) {
                CompletedEvaluationEmitter.emit('completedEvaluation', isResponse.evaluation, isResponse.employed);
            }

            return res.status(201).send({
                status: 'Success',
                message: 'Response verify successfully.',
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
