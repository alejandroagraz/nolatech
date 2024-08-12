'use strict'

const mongoose = require('mongoose');
const Gender = require("../common/constants/gender");
const { Schema } = mongoose;

const DepartmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: false,
            required: true
        },
        description: {
            type: String,
            unique: false,
            required: true
        },
        manager: {
            type: Schema.Types.ObjectId,
            ref: 'Manager',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Department', DepartmentSchema);
