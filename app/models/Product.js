const { Schema, model } = require('mongoose')

module.exports = model('Product', new Schema({
    cateId: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required:[true, 'Product name required']
    },
    price: {
        type: Number,
        required:[true, 'Price required']
    },
    imglink: {
        type: String,
        required: false,
    },
	desc: {
        type: String,
        required: false,
    }
}))