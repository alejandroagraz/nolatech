'use strict'

const sanitize = require("mongo-sanitize");
const EvaluationCompleted = require('../models/evaluationCompleted');
const {countQuestionsByIdEvaluation} = require("./questionRepository");
const {countResponsesCorrectByIdEvaluationEmployed} = require("./responseRepository");
const Employed = require("../models/employed");

module.exports = {

    verifyEvaluationCompleted: async (evaluation_id, employed_id) => {
        const evaluation = sanitize(evaluation_id);
        const employed = sanitize(employed_id);

        const isEvaluationCompleted = await EvaluationCompleted.findOne({evaluation, employed}).exec();

        if (isEvaluationCompleted && !isEvaluationCompleted.isVerified) {
            const countQuestions = await countQuestionsByIdEvaluation(evaluation);
            const countResponsesCorrect = await countResponsesCorrectByIdEvaluationEmployed(evaluation, employed, true);

            const isVerified = true;
            const punctuation = ((countResponsesCorrect / countQuestions) * 10).toFixed(2);

            await EvaluationCompleted.findByIdAndUpdate({_id: isEvaluationCompleted._id}, {
                isVerified,
                punctuation
            }).exec();

        }

    },

    getEvaluationCompletedByArrayIdDepartment: async (array) => {
        const arrayIdEvaluationsActive = sanitize(array);
        return await EvaluationCompleted.find(
            {
                evaluation: { "$in" : arrayIdEvaluationsActive},
            })
            .populate({
                path:  'employed',
                populate: 'user',}).exec();
    }

};
