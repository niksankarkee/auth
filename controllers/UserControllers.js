const User = require('../model/UserModels');
const bcrypt = require('bcrypt');

exports.register = (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user === null) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {

            })
        }
    })
}

exports.register = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((err, user) => {
            if (user !== null) {
                return res.json({ err: 'Email has been used' })
            }
            return bcrypt.hash(req.body.password, 10);
        })
        .then((err, hash) => {
            if (err) {
                return next(err);
            }
            const user = new User(req.body);
            user.role = ['customer'];
            user.password = hash;
            user.passwordConfirm = hash;
            return user.save(result => {
                res.json({ user: result })
            })
        })
        .catch(err => {
            res.json({ err: err });
        })
}