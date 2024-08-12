'use strict'

const sanitize = require("mongo-sanitize");
const Manager = require('../models/manager');

module.exports = {

    getOneManager: async (id) => {
        const _id = sanitize(id);
        return await Manager.findOne({_id}).exec();
    }

};
