'use strict'

const sanitize = require('mongo-sanitize');
const exceljs = require("exceljs");
const {countQuestionsByIdEvaluation} = require("../repositories/questionRepository");
const {getOnEmployedByIdUser} = require("../repositories/employedRepository");
const {getOneEvaluation} = require("../repositories/evaluationRepository");
const {countResponsesByIdEvaluationEmployed, getResponsesQuestionsByIdEvaluationEmployed} = require("../repositories/responseRepository");
const {formatReport} = require("../common/validators/formatReport");
const EvaluationCompleted = require('../models/evaluationCompleted');
const CronNotification = require('../commands/tasks/evaluationPending');

module.exports = {

    listCompleted: async () => {
        await CronNotification.sendNotifications();


        return  await EvaluationCompleted.find().populate({
            path:  'employed',
            populate: 'user',
        }).populate('evaluation').exec();
    },

    detailCompleted: async (req, res) => {
        try {
            const _id = sanitize(req.params.id);

            const evaluationCompleted = await EvaluationCompleted.findOne({evaluation: _id})
                .populate('evaluation')
                .populate('department')
                .populate({
                    path:  'employed',
                    populate: 'user',
                })
                .populate({
                    path:  'responses',
                    populate: 'question',
                }).exec();

            if (!evaluationCompleted?.evaluation)
                return res.status(404).send({
                    status: 'error',
                    message: `Evaluation: ${_id} not found`
                });

            return res.status(200).send({
                status: 'success',
                data: evaluationCompleted
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

    submit: async (req, res) => {
        try {
            const _id = sanitize(req.params.id);
            const isEvaluation = await getOneEvaluation(_id);

            if (!isEvaluation)
                return res.status(404).send({
                    status: 'error',
                    message: `Evaluation: ${_id} not found`
                });

            const employed = await getOnEmployedByIdUser(req.user.userId);
            const isEvaluationCompleted = await EvaluationCompleted.findOne({evaluation :isEvaluation._id, employed: employed._id}).exec();

            if (isEvaluationCompleted)
                return res.status(403).send({
                    status: 'error',
                    message: `You have already completed this assessment previously`
                });

            const countQuestion = await countQuestionsByIdEvaluation(_id);
            const countResponse = await countResponsesByIdEvaluationEmployed(_id, employed._id);

            if (countQuestion !== countResponse)
                return res.status(403).send({
                    status: 'error',
                    message: 'There are still pending questions to be answered.',
                });

            const newEvaluationCompleted = new EvaluationCompleted();
            const questionsResponses = await getResponsesQuestionsByIdEvaluationEmployed(isEvaluation._id, employed._id);

            newEvaluationCompleted.comment = sanitize(req.body.comment);
            newEvaluationCompleted.employed = employed;
            newEvaluationCompleted.department = employed.department;
            newEvaluationCompleted.evaluation = isEvaluation;
            newEvaluationCompleted.evaluation = isEvaluation;
            newEvaluationCompleted.responses = questionsResponses;
            const response = await newEvaluationCompleted.save(newEvaluationCompleted);

            return res.status(201).send({
                status: 'Success',
                message: 'Evaluation completed successfully.',
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

    // Get report for one employed
    reportEmployed: async (req, res) => {
        try {
            const _id = sanitize(req.params.id);
            const respData = [];
            const evaluationCompleted = await EvaluationCompleted.find({employed: _id})
                .populate('evaluation')
                .populate('department')
                .populate({
                    path:  'employed',
                    populate: 'user',
                }).exec();

            for (let i=0; i < evaluationCompleted.length; i++) {
                const data = {
                    employed_id: evaluationCompleted[i].employed._id.toString(),
                    employed_name: `${evaluationCompleted[i].employed.user.firstname} ${evaluationCompleted[i].employed.user.lastname}`,
                    employed_dni: evaluationCompleted[i].employed.user.dni,
                    employed_email: evaluationCompleted[i].employed.user.email,
                    employed_username: evaluationCompleted[i].employed.user.username,
                    evaluation_id: evaluationCompleted[i].evaluation._id.toString(),
                    evaluation_title: evaluationCompleted[i].evaluation.title,
                    evaluation_is_verify: evaluationCompleted[i].isVerified ? 'yes' : 'no',
                    evaluation_punctuation: evaluationCompleted[i].punctuation,
                    department_id: evaluationCompleted[i].department._id.toString(),
                    department_name: evaluationCompleted[i].department.name,
                    department_description: evaluationCompleted[i].department.description,
                }

                respData.push(data)
            }


            const workbook = formatReport(respData);


            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + `employed-report-${Date.now()}.xlsx`
            );

            return workbook.xlsx.write(res).then(function () {
                res.status(200).end();
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

    // Get report for one department
    reportDepartment: async (req, res) => {
        try {
            const _id = sanitize(req.params.id);
            const respData = [];
            const evaluationCompleted = await EvaluationCompleted.find({department: _id})
                .populate('evaluation')
                .populate('department')
                .populate({
                    path:  'employed',
                    populate: 'user',
                }).exec();

            for (let i=0; i < evaluationCompleted.length; i++) {
                const data = {
                    department_id: evaluationCompleted[i].department._id.toString(),
                    department_name: evaluationCompleted[i].department.name,
                    department_description: evaluationCompleted[i].department.description,
                    employed_id: evaluationCompleted[i].employed._id.toString(),
                    employed_name: `${evaluationCompleted[i].employed.user.firstname} ${evaluationCompleted[i].employed.user.lastname}`,
                    employed_dni: evaluationCompleted[i].employed.user.dni,
                    employed_email: evaluationCompleted[i].employed.user.email,
                    employed_username: evaluationCompleted[i].employed.user.username,
                    evaluation_id: evaluationCompleted[i].evaluation._id.toString(),
                    evaluation_title: evaluationCompleted[i].evaluation.title,
                    evaluation_is_verify: evaluationCompleted[i].isVerified ? 'yes' : 'no',
                    evaluation_punctuation: evaluationCompleted[i].punctuation
                }

                respData.push(data)
            }


            const workbook = formatReport(respData);


            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + `department-report-${Date.now()}.xlsx`
            );

            return workbook.xlsx.write(res).then(function () {
                res.status(200).end();
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

