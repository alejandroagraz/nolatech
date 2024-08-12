'use strict'

const {decodeToken} = require('../services/tokenService');
const moment = require('moment');

module.exports = {

  isLoggedIn: (req, res, next) => {
    try {
      if (!req.headers.authorization)
        return res.status(200).send({
          status: 'error',
          message: 'The token is not valid',
        });

      const token = req.headers.authorization.split(" ")[1];
      if (!token)
        return res.status(401).send({ status: 'error', message: 'No token provided' });

      const payload = decodeToken(token);

      if (moment(payload.exp).format('YYYY/MM/DD HH:mm:ss') <= moment().format('YYYY/MM/DD HH:mm:ss')) {
        return res.status(200).send({
          status: 'error',
          message: 'Your session has expired',
        });
      }
      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).send({
        status: 'error',
        message: err.message,
      });
    }
  },

  verifyRole: (role) => (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = decodeToken(token);

      if (!role.includes(payload.role)) {
        return res.status(403).send({
          status: 'error',
          message: 'Your do not have the authorization and permissions to access this resource.',
        });
      }

      next();
    } catch (err) {
      return res.status(403).send({
        status: 'error',
        message: err.message,
      });
    }
  }

};



