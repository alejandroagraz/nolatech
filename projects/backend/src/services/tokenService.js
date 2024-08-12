const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

module.exports = {

  createToken: (user) => {
    const {_id, email, username, role} = user;
    const payload = {
      userId: _id,
      email,
      username,
      role,
      iat: moment().unix(),
      exp: moment().add(5, "minutes")
    };

    return jwt.encode(payload, process.env.TOKEN_SECRET);
  },

  decodeToken:  (token) => {
    return jwt.decode(token, process.env.TOKEN_SECRET);
  }

};
