'use strict'

const sanitize = require("mongo-sanitize");
const Question = require('../models/question');

module.exports = {

    getOneQuestion: async (id) => {
        const _id = sanitize(id);
        return await Question.findOne({_id}).populate('evaluation').exec();
    },

    getQuestionsByIdEvaluation: async (id) => {
        const _id = sanitize(id);
        return await Question.find({evaluation: _id}).exec();
    },

    countQuestionsByIdEvaluation: async (id) => {
        const _id = sanitize(id);
        return await Question.countDocuments({evaluation: _id}).exec();
    }

};
