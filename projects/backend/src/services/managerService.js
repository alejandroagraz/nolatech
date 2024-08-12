'use strict'

const sanitize = require('mongo-sanitize');
const {getDepartmentsByIdManager} = require("../repositories/departmentRepository");
const {registerUser, updateUser} = require("./userService");
const {formatData} = require("../common/validators/formatData");
const Role = require("../common/constants/role");
const Manager = require('../models/manager');

module.exports = {

    // List all manager
    list: async () => {
        return await Manager.find().exec();
    },

    // Get one manager
    detail: async (req, res) => {
        try {
            const _id = sanitize(req.params.id);
            const manager = await Manager.findOne({_id})
                .populate('user').exec();

            if (!manager)
                return res.status(404).send({
                    status: 'error',
                    message: `Manager: ${_id} not found`
                });

            const departments = await getDepartmentsByIdManager(_id);
            const response = formatData(manager, departments, 'departments')

            return res.status(200).send({
                status: 'success',
                data: response
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

    // Register one manager
    register: async (req, res) => {
        try {
            const user = await registerUser(req, res, Role.manager);
            if (!user)
                return res.status(400).send({
                    status: 'error',
                    message: 'An unexpected error occurred, please try again.'
                });

            const newManager = new Manager();
            newManager.gender = sanitize(req.body.gender);
            newManager.address = sanitize(req.body.address);
            newManager.user = user;
            const manager = await newManager.save(newManager);

            return res.status(201).send({
                status: 'Success',
                message: 'Manager registered successfully.',
                data: manager,
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

    // update one manager
    update: async (req, res) => {
        try {
            const _id = sanitize(req.params.id);
            const isManager = await Manager.findOne({_id}).populate('user').exec();

            if (!isManager)
                return res.status(404).send({
                    status: 'error',
                    message: `Manager: ${_id} not found`
                });

            if (!isManager.user)
                return res.status(404).send({
                    status: 'error',
                    message: `Profile user for Manager: ${_id} not found`
                });

            const userData = {
                firstname: req.body.firstname ? sanitize(req.body.firstname) : isManager.user?.firstname,
                lastname: req.body.lastname ? sanitize(req.body.lastname) : isManager.user?.lastname,
                dni: req.body.dni ? sanitize(req.body.dni) : isManager.user?.dni,
                email: req.body.email ? sanitize(req.body.email) : isManager.user?.email,
                username: req.body.username ? sanitize(req.body.username) : isManager.user?.username,
            }

            const gender = req.body.gender ? sanitize(req.body.gender) : isManager.gender;
            const address = req.body.address ? sanitize(req.body.address) : isManager.address;
            const user = await updateUser(req, res, isManager.user?._id, userData);

            const resp = await Manager.findByIdAndUpdate({_id}, {
                gender,
                address,
                user
            }).populate('user').exec();

            return res.status(201).send({
                status: 'Success',
                message: 'Manager update successfully.',
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
