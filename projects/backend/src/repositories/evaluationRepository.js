'use strict'

const sanitize = require("mongo-sanitize");
const moment = require("moment");
const Evaluation = require('../models/evaluation');
const Status = require("../common/constants/status");

module.exports = {

    getOneEvaluation: async (id) => {
        const _id = sanitize(id);
        return await Evaluation.findOne({_id}).exec();
    },

    getEvaluationsActive: async (id) => {
        const dateNow = moment().format('YYYY/MM/DD');
        const _id = sanitize(id);
        return await Evaluation.find({
            status: Status.active,
            '$where': `this.endDate >= ${dateNow}`
        }).populate('department').exec();
    }

};
