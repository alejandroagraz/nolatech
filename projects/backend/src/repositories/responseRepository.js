'use strict'

const sanitize = require("mongo-sanitize");
const Response = require("../models/response");

module.exports = {

    countResponsesByIdEvaluationEmployed: async (evaluation_id, employed_id) => {
        const evaluation = sanitize(evaluation_id);
        const employed = sanitize(employed_id);
        return await Response.countDocuments({evaluation, employed}).exec();
    },

    countResponsesCorrectByIdEvaluationEmployed: async (evaluation_id, employed_id, correct) => {
        const evaluation = sanitize(evaluation_id);
        const employed = sanitize(employed_id);
        const isCorrect = sanitize(correct)
        return await Response.countDocuments({evaluation, employed, isCorrect}).exec();
    },

    countResponsesVerifyByIdEvaluationEmployed: async (evaluation_id, employed_id) => {
        const evaluation = sanitize(evaluation_id);
        const employed = sanitize(employed_id);
        const isVerified = true;
        return await Response.countDocuments({evaluation, employed, isVerified}).exec();
    },

    getResponsesQuestionsByIdEvaluationEmployed: async (evaluation_id, employed_id) => {
        const evaluation = sanitize(evaluation_id);
        const employed = sanitize(employed_id);
        return await Response.find({evaluation, employed}).populate('question').exec();
    },

};
