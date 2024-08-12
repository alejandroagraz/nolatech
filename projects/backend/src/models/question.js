'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            unique: false,
            required: true
        },
        evaluation: {
            type: Schema.Types.ObjectId,
            ref: 'Evaluation'
        },
    },
        { timestamps: true }
);

module.exports = mongoose.model('Question', QuestionSchema);
