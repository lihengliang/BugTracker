const mongoose = require('mongoose');
const validator = require('validator');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password1, password2 } = req.body;
    // validation
    let errors = [];
    
    if (!firstName || !lastName || !email || !password1 || !password2) {
        errors.push('Please fill in all fields');
    }

    // check if email is taken or not
    await User.getUserByEmail(email, (error, user) => {
        if (error) {
            throw error;
        }
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


module.exports.login = async (req, res, next) => {
    const {email, password } = req.body;
    let errors = [];

    await User.getUserByEmail(email, (error, user) => {
        if (error) {
            throw error;
        }
        if (!user) {
            errors.push('Incorrect email or password');
            return res.status(401).send(errors);
        }
        User.checkPassword(password, user.password, (error, isMatch) => {
            if (error) {
                throw error;
            }
            if (!isMatch) {
                errors.push('Incorrect email or password');
                return res.status(401).send(errors);
            }

            const token = jwt.sign({data: user}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXP
            });
            
            tokenRes = {
                success: true,
                token: token,
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    exp: process.env.JWT_EXP
                }
            }
            console.log(tokenRes);
            res.json(tokenRes);
        });
    });
}