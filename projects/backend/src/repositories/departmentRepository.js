'use strict'

const sanitize = require("mongo-sanitize");
const Department = require('../models/department');

module.exports = {

    getOneDepartment: async (id) => {
        const _id = sanitize(id);
        return await Department.findOne({_id}).exec();
    },

    getDepartmentsByIdManager: async (id) => {
        const _id = sanitize(id);
        return await Department.find({manager: _id}).exec();
    }

};
