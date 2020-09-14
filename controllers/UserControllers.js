const User = require('../model/UserModels');
const bcrypt = require('bcrypt');

exports.register = (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const role = 'customer';
    const password = req.body.password;
    // const passwordConfirm = req.body.passwordConfirm;

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