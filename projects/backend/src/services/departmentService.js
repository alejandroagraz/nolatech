'use strict'

const sanitize = require('mongo-sanitize');
const Department = require('../models/department');
const {getOneManager} = require("../repositories/managerRepository");

module.exports = {

    // List all department
    list: async () => {
        return await Department.find().exec();
    },

    // Register one department
    register: async (req, res) => {
        try {
            const isManager = await getOneManager(req.body.manager_id);

            if (!isManager)
                return res.status(404).send({
                    status: 'error',
                    message: `Manager: ${req.body.manager_id} not found`
                });

            const newDepartment = new Department();

            newDepartment.name = sanitize(req.body.name);
            newDepartment.description = sanitize(req.body.description);
            newDepartment.manager = isManager;
            const department = await newDepartment.save(newDepartment);

            return res.status(201).send({
                status: 'Success',
                message: 'Department registered successfully.',
                data: department,
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
