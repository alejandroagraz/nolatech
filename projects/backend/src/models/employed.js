'use strict'

const mongoose = require('mongoose');
const Gender = require("../common/constants/gender");
const { Schema } = mongoose;

const EmployedSchema = new mongoose.Schema(
    {
        gender: {
            type: String,
            enum: Gender,
            default: Gender.man
        },
        address: {
            type: String,
            unique: false,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            required: true
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            unique: false,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Employed', EmployedSchema);
