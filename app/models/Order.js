const { Schema, model } = require('mongoose')

module.exports = model('Order', new Schema({
    title: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 1,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdOn: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
}))