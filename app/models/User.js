const { Schema, model } = require('mongoose')

module.exports = model('User', new Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: [true, "This Email Already Exist"],
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    }
}))