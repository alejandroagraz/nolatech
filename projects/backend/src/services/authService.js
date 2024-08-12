'use strict'

const bcrypt = require("bcryptjs");
const {registerUser} = require("./userService");
const {createToken} = require("./tokenService");
const Role = require("../common/constants/role");
const {getOneByEmailOrUsername} = require("../repositories/userRepository");

module.exports = {

    register: async (req, res) => {
        const user = await registerUser(req, res, Role.admin);
        if (!user)
            return res.status(400).send({
                status: 'error',
                message: 'An unexpected error occurred, please try again.'
            });

        return res.status(201).send({
            status: 'Success',
            message: 'User registered successfully.',
            data: user,
        });
    },

    login: async (req, res) => {
        const data = req.body;
        const isUser = await getOneByEmailOrUsername(data.username);
        if (isUser) {
            bcrypt.compare(data.password, isUser.password, (err, resp) => {
                if (err) {
                    return res.status(400).send({
                        status: 'error',
                        message: err.message
                    });
                }
                if (resp) {
                    const token = createToken(isUser);
                    return res.status(200).send({
                        status: 'success',
                        data: {
                            access_token: token,
                        }
                    });
                } else {
                    return res.status(401).send({
                        status: 'error',
                        message: 'Username or password is incorrect'
                    });
                }
            });
        } else {
            return res.status(401).send({
                status: 'error',
                message: 'Username or password is incorrect'
            });
        }
    }

};

