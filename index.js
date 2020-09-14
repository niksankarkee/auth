const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const routes = require('./routes/routes');
const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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
    })
    .catch(err => {
        console.log('DB connection eror: ', err.message);
    });

app.use(session({
    secret: 'my secret',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log('Server started on http://locahost:' + process.env.PORT);
});

module.exports = app;