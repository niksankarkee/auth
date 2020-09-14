const User = require('../model/UserModels');

exports.UserValidator = (req, res, next) => {
    req.check('email', 'Invalid email.').isEmail();
    req.check('email', 'Email is required.').not().isEmpty();
    req.check('username', 'Username is required.').not().isEmpty();
    req.check('username', 'Username must be more than 1 characters.').isLength({ min: 2 });
    req.check('password', 'Password is required.').not().isEmpty();
    req.check('password', 'Password must be more than 6 charecters').isLength({ min: 6 });
    req.check('passwordConfirm', 'Password confirm is required.').not().isEmpty();
    req.check('passwordConfirm', 'Password mismatch').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
}