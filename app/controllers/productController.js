const Product = require('../models/Product')
const mongoose = require('mongoose')

exports.get = async (req, res) => {
    try {
        res.status(200).json(await Product.find());
    } catch (err) {
        console.debug(err.message, err)
        res.status(500).send({ message: 'Something went wrong!' })
    }
}

exports.getById = async (req, res) => {
    try {
        const Product = await Product.findById(req.params.id)
        if(!Product) {
            return res.status(404).json({ message: 'Invalid product id' })
        }
        res.status(200).json(Product)
    } catch(err) {
        console.debug(err.message, err)
        res.status(500).send({ message: 'Something went wrong!' })
    }
}
exports.getBycateId = async (req, res) => {
    try {
        const Product = await Product.find(req.params.cateId)
        if(!Product) {
            return res.status(404).json({ message: 'Invalid product Category id' })
        }
        res.status(200).json(Product)
    } catch(err) {
        console.debug(err.message, err)
        res.status(500).send({ message: 'Something went wrong!' })
    }
}
exports.create = async (req, res) => {
    try {
        await Product.create(req.body)
        res.status(200).json(await Product.find());   
    } catch(err) {
        console.debug(err.message, err)
        if (err instanceof mongoose.Error.ValidationError) {
            return res.status(422).send({ message: err.message })
        }
        res.status(500).send({ message: 'Something went wrong!' })
    }
}

exports.update = async (req, res) => {
    try {
        if(! await Product.findOneAndUpdate({_id: req.params.id}, req.body)) {
            return res.status(404).json({ message: 'Invalid product id' })
        }
        res.status(200).json(await Product.find())
    } catch(err) {
        console.debug(err.message, err)
        res.status(500).send({ message: 'Something went wrong!' })
    }
}

exports.delete = async (req, res) => {
    try {
        if (! await Product.findOneAndDelete({_id: req.params.id})) {
            return res.status(404).json({ message: 'Invalid product id' })
        }
        res.status(422).json(await Product.find())
    } catch(err) {
        console.debug(err.message, err)
        res.status(500).send({ message: 'Something went wrong!' })

    }
}