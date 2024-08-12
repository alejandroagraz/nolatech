'use strict'

const mongoose = require('mongoose');
const Gender = require("../common/constants/gender");
const { Schema } = mongoose;

const ManagerSchema = new mongoose.Schema(
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
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Manager', ManagerSchema);
