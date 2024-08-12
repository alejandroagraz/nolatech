'use strict'

const express = require('express');
const router = express.Router();

router.get ('/', async (req, res) => {
    res.send('Welcome to the api project Nolatech of Jose Agraz - joseagraz29@gmail.com');
});

module.exports = router;
