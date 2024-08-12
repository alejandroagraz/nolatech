require('dotenv').config();
const nodemailer = require('nodemailer');
const {getEvaluationsActive} = require("../../repositories/evaluationRepository");
const {getEmployeesByArrayIdDepartment} = require("../../repositories/employedRepository");
const {getEvaluationCompletedByArrayIdDepartment} = require("../../repositories/evaluationCompletedRepository");


module.exports = {

    sendNotifications:  async () => {
        const arrayIdDepartments = [];
        const arrayIdEvaluationsActive = [];
        let employeesNotification = '';

        const evaluationsActive = await getEvaluationsActive();

        if (evaluationsActive.length > 0) {
            for (let i=0; i < evaluationsActive.length; i++) {
                arrayIdDepartments.push(evaluationsActive[i].department._id.toString());
                arrayIdEvaluationsActive.push(evaluationsActive[i]._id.toString());
            }

            const employees = await getEmployeesByArrayIdDepartment(arrayIdDepartments);

            const evaluationsCompleted = await getEvaluationCompletedByArrayIdDepartment(arrayIdEvaluationsActive);

            if (evaluationsCompleted.length > 0) {
                for (let i= 0; i < evaluationsCompleted.length; i++) {
                    employeesNotification = employees.filter(employed => employed.user.email !== evaluationsCompleted[i].employed.user.email);
                }
            } else {
                employeesNotification = employees;
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            for (let i=0; i < employeesNotification.length; i++) {
                const name = `Dear ${employeesNotification[i].user.firstname} ${employeesNotification[i].user.lastname}`;
                const mailOptions = {
                    from: 'nolatechnotification@gmail.com',
                    to: employeesNotification[i].user.email,
                    subject: 'Evaluation pending',
                    html:
                        ` <div>
            <h1>`+ name +`</h1>
            <h2>You have pending evaluations to send, which expire on the day</h2>
        </div>`
                };
                await transporter.sendMail(mailOptions);
            }
        }
    }

};
