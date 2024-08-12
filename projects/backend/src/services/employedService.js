'use strict'

const sanitize = require('mongo-sanitize');
const {getOneDepartment} = require("../repositories/departmentRepository");
const {registerUser, updateUser} = require("./userService");
const Role = require("../common/constants/role");
const Employed = require('../models/employed');

module.exports = {

    list: async () => {
        return await Employed.find().exec();
    },

    detail: async (req, res) => {
        try {
            const _id = sanitize(req.params.id);
            const employed = await Employed.findOne({_id})
                .populate('user')
                .populate('department').exec();

            if (!employed)
                return res.status(404).send({
                    status: 'error',
                    message: `Employed: ${_id} not found`
                });

            return res.status(200).send({
                status: 'success',
                data: employed
            });
        } catch (err) {
            res.status(400).send(
                {
                    status: 'error',
                    message: err.message
                }
            )
        }
    },

    register: async (req, res) => {
        try {
            const isDepartment = await getOneDepartment(req.body.department_id);

            if (!isDepartment)
                return res.status(404).send({
                    status: 'error',
                    message: `Department: ${req.body.department_id} not found`
                });

            const user = await registerUser(req, res, Role.employed);
            if (!user)
                return res.status(400).send({
                    status: 'error',
                    message: 'An unexpected error occurred, please try again.'
                });

            const newEmployed = new Employed();

            newEmployed.gender = sanitize(req.body.gender);
            newEmployed.address = sanitize(req.body.address);
            newEmployed.user = user;
            newEmployed.department = isDepartment;

            const employed = await newEmployed.save(newEmployed);

            return res.status(201).send({
                status: 'Success',
                message: 'Employed registered successfully.',
                data: employed,
            });

        } catch (err) {
            res.status(400).send(
                {
                    status: 'error',
                    message: err.message
                }
            )
        }
    },

    update: async (req, res) => {
        try {
            let department = false;
            const _id = sanitize(req.params.id);
            const isEmployed = await Employed.findOne({_id})
                .populate('user')
                .populate('department')
                .exec();

            if (!isEmployed)
                return res.status(404).send({
                    status: 'error',
                    message: `Employed: ${_id} not found`
                });

            if (!isEmployed.user)
                return res.status(404).send({
                    status: 'error',
                    message: `Profile user for Employed: ${_id} not found`
                });


            if (req.body.department_id) {
                const isDepartment = await getOneDepartment(req.body.department_id);
                if (!isDepartment) {
                    return res.status(404).send({
                        status: 'error',
                        message: `Department: ${req.body.department_id} not found`
                    });
                }

                department = isDepartment || isEmployed.department;
            } else {
                department = isEmployed.department;
            }

            const userData = {
                firstname: req.body.firstname ? sanitize(req.body.firstname) : isEmployed.user?.firstname,
                lastname: req.body.lastname ? sanitize(req.body.lastname) : isEmployed.user?.lastname,
                dni: req.body.dni ? sanitize(req.body.dni) : isEmployed.user?.dni,
                email: req.body.email ? sanitize(req.body.email) : isEmployed.user?.email,
                username: req.body.username ? sanitize(req.body.username) : isEmployed.user?.username,
            }

            const user = await updateUser(req, res, isEmployed.user?._id, userData);
            const gender = req.body.gender ? sanitize(req.body.gender) : isEmployed.gender;
            const address = req.body.address ? sanitize(req.body.address) : isEmployed.address;

            const resp = await Employed.findByIdAndUpdate({_id}, {
                gender,
                address,
                user,
                department,
            })
            .populate('user')
            .populate('department').exec();

            return res.status(201).send({
                status: 'Success',
                message: 'Employed update successfully.',
                data: resp,
            });

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
