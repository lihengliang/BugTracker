const mongoose = require('mongoose');
const validator = require('validator');
const User = mongoose.model('User');

module.exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password1, password2 } = req.body;
    // validation
    let errors = [];
    
    if (!firstName || !lastName || !email || !password1 || !password2) {
        errors.push('Please fill in all fields');
    }

    // check if email is taken or not
    await User.findOne({ email: email })
    .then(user => {
        if (user) {
            errors.push('Email is already taken');
        }
    });

    if (!validator.isEmail(email)) {
        errors.push('Please enter a valid email');
    }

    if (!validator.equals(password1, password2)) {
        errors.push('Passwords do not match (password is case sensitive)')
    }

    const password = password1;

    if (password.length < 6 || password.length > 16) {
        errors.push('Password must be between 6-16 characters');
    }
    

    if (errors.length > 0) {
        console.log(errors);
        return res.status(422).send(errors);
    }

    // create user
    const newUser = { firstName, lastName, email, password};
    let user = new User(newUser);

    user.save((error, doc) => {
        if (!error) {
            res.send(doc);
        } else {
            if (error.name === 'ValidationError') {
                Object.keys(error.errors).forEach(key => errors.push(error.errors[key].message));
            }
            console.log(errors);
            res.status(422).send(errors);
        }
    });
};