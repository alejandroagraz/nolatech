'use strict'

const mongoose = require('mongoose');
const Role = require("../common/constants/role");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: Role,
            default: Role.admin
        },
        firstname: {
            type: String,
            unique: false,
            required: true
        },
        lastname: {
            type: String,
            unique: false,
            required: true
        },
        dni: {
            type: Number,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            unique: false,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
