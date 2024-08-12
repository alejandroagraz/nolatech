'use strict'

const sanitize = require("mongo-sanitize");
const Employed = require('../models/employed');

module.exports = {

    getOnEmployedByIdUser: async (id) => {
        const _id = sanitize(id);
        return await Employed.findOne({user: _id})
            .populate('department').exec();
    },

    getEmployeesByArrayIdDepartment: async (array) => {
        const arrayIdDepartments = sanitize(array);
        return await Employed.find({
            department: { "$in" : arrayIdDepartments},
        }).populate('user').exec();
    }

};
