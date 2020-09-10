const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

const db = mongoose.connection;

dotenv.config();

// connect db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
    .then(() => {
        console.log('Db connected');
    });


db.on('error', err => {
    console.log('DB connection eror: ', err.message);
})

app.use('/', (req, res, next) => {
    res.json({ "msg": "HELLO!" })
})

app.listen(process.env.PORT, () => {
    console.log('Server started on http://locahost:' + process.env.PORT);
});