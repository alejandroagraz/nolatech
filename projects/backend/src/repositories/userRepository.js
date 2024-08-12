'use strict'

const sanitize = require("mongo-sanitize");
const User = require('../models/user');

module.exports = {

    getOneByEmailOrUsername: async (data) => {
        const username = sanitize(data);
        return await User.findOne({
            $or: [{email: username}, {username}],
        }).exec();
    }

};
