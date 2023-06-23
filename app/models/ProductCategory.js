const { Schema, model } = require('mongoose')

module.exports = model('ProductCategory', new Schema({
    cId: {
        type: Number,
        required:[true, 'Category id  required']
    },
    CategoryName: {
        type: String,
        required:[true, 'Product category name required']
    }
   
}))