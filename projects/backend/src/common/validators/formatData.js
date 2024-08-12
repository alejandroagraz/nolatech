'use strict'

module.exports = {

    formatData: (x,y, name) => {
        const str = JSON.stringify(x);
        const resp = JSON.parse(str);
        resp[name] = y;
        return resp;
    },
};
