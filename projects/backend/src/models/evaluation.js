'use strict'

const mongoose = require('mongoose');
const Status = require("../common/constants/status");
const { Schema } = mongoose;

const EvaluationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: false,
            required: true
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: Status,
            default: Status.active
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

module.exports = mongoose.model('Evaluation', EvaluationSchema);
