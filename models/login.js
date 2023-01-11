const mongoose = require('mongoose');

const LoginSchema = {
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}

module.exports = new mongoose.model('User', LoginSchema);