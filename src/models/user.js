const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(age) {
            if (age < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(password) {
            if (password.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain word "password"');
            }
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;