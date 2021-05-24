const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "First name is required"
    },
    lastName: {
        type: String,
        required: "Last name is required"
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true
    },
    password: {
        type: String,
        required: "Password is required",
        minlength: [6, 'Password must be between 6-16 characters long'],
        maxlength: [16, 'Password must be between 6-16 characters long']
    },
    date: {
        type: Date,
        default: Date.now
    },
    salt: {
        type: String
    },
});

// pre event before saving user
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(this.password, salt, (error, hash) => {
            this.password = hash;
            this.salt = salt;
            next();
        });
    });
});

// validate fields
userSchema.path('email').validate((email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}, "Invalid email");

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserByEmail = (email, callback) => {
    User.findOne({email: email}, callback);
}

module.exports.checkPassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (error, isMatch) => {
        if (error) {
            throw error;
        }
        callback(null, isMatch);
    });
}