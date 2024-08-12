require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();
const CronNotification = require('./src/commands/tasks/evaluationPending');
const homeRouter = require('./src/routes/home');
const authRouter = require('./src/routes/auth');
const employedRouter = require('./src/routes/employed');
const managerRouter = require('./src/routes/manager');
const departmentRouter = require('./src/routes/department');
const evaluationRouter = require('./src/routes/evaluation');
const evaluationCompletedRouter = require('./src/routes/evaluationCompleted');
const questionRouter = require('./src/routes/question');
const responseRouter = require('./src/routes/response');
const {specs, swaggerUi} = require("./src/common/utils/setup-swagger");
const cron = require("node-cron");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    req.setTimeout(5000); // Set request timeout to 5 seconds
    res.setTimeout(5000); // Set response timeout to 5 seconds
    next();
});

// Enable CORS with specific options
app.use(cors({
    origin: `http://localhost:${process.env.PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/api', [
    authRouter,
    employedRouter,
    managerRouter,
    departmentRouter,
    evaluationRouter,
    questionRouter,
    responseRouter,
    evaluationCompletedRouter,
]);
app.use(homeRouter);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(res.status(404).send({
        status: 'error',
        message: 'Error 404: Resource not found'
    }));
});

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONO_DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connection to the correct database !!!');
        app.listen(process.env.PORT, () => {
            console.log(`Application Nolatech is running on: http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err));

cron.schedule('5 * * * *', CronNotification.sendNotifications)
