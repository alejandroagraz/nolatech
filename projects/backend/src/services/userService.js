'use strict'

const sanitize = require("mongo-sanitize");
const User = require('../models/user');
const bcrypt = require("bcryptjs");

module.exports = {

    registerUser: async (req, res, role) => {
        try {
            const user = new User();
            user.role = role;
            user.firstname = sanitize(req.body.firstname);
            user.lastname = sanitize(req.body.lastname);
            user.dni = sanitize(req.body.dni);
            user.email = sanitize(req.body.email);
            user.username = sanitize(req.body.username);
            user.password = bcrypt.hashSync(req.body.password, 8);

            return await user.save(user);
        } catch (err) {
            res.status(400).send(
                {
                    status: 'error',
                    message: err.message
                }
            )
        }
    },

    updateUser: async (req, res, id, data) => {
        try {
            return await User.findByIdAndUpdate({_id: id.toString()},data).exec();
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
