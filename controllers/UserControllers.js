const User = require('../model/UserModels');
const bcrypt = require('bcrypt');

exports.register = (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const role = 'customer';
    const password = req.body.password;

    User.findOne({ email: email })
        .then(validatemail => {
            if (validatemail !== null) {
                return res.json({ err: 'Email has been used' })
            }
            return bcrypt
                .hash(password, 10)
                .then(hashPassword => {
                    const user = new User({
                        username: username,
                        email: email,
                        role: role,
                        password: hashPassword,
                        passwordConfirm: hashPassword
                    });
                    return user.save();
                })
                .then(user => {
                    res.json({ user: user });
                })
        })
        .catch(err => {
            res.status(400).send(err);
        })
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (!user) {
                return res.json({ 'error': 'Username and Passwordare incorrect' });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then(domMatch => {
                    if (domMatch) {
                        req.session.user = user;
                        res.json({
                            user: user,
                            'login': 'success'
                        })
                    } else {
                        return res.json({ 'err': 'Username and password are incorrect' });
                    }
                })

        })
        .catch(err => {
            return res.json({ err })
        })
}