const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const routes = require('./routes/routes');
const mongoose = require('mongoose');

const app = express();

const db = mongoose.connection;

dotenv.config();

// connect db
mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Db connected');
    });

db.on('error', err => {
    console.log('DB connection eror: ', err.message);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log('Server started on http://locahost:' + process.env.PORT);
});

module.exports = app;