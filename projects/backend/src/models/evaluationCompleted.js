'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const EvaluationCompletedSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            unique: false,
            required: true
        },
        punctuation: {
            type: Number,
            unique: false,
            required: false,
            default: 0.00
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        employed: {
            type: Schema.Types.ObjectId,
            ref: 'Employed'
        },
        evaluation: {
            type: Schema.Types.ObjectId,
            ref: 'Evaluation'
        },
        responses: [{
            type: Schema.Types.ObjectId,
            ref: 'Response'
        }],
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department'
        },
    },
        { timestamps: true }
);

module.exports = mongoose.model('EvaluationCompleted', EvaluationCompletedSchema);
