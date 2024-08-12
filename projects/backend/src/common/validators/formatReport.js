'use strict'

const exceljs = require("exceljs");
module.exports = {

    formatReport: (data) => {
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("Report");

        let columns = data.reduce((acc, obj) => acc = Object.getOwnPropertyNames(obj), [])

        worksheet.columns = columns.map((el) => {
            return { header: el, key: el, width: 20 };
        });

        worksheet.addRows(data);

        return workbook;
    }

};
