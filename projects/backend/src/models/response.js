'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResponseSchema = new mongoose.Schema(
    {
        response: {
            type: String,
            unique: false,
            required: true
        },
        isCorrect: {
            type: Boolean,
            default: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        question: {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        },
        evaluation: {
            type: Schema.Types.ObjectId,
            ref: 'Evaluation'
        },
        employed: {
            type: Schema.Types.ObjectId,
            ref: 'Employed',
            unique: false,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Response', ResponseSchema);
