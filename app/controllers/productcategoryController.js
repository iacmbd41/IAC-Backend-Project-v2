const ProductCate = require('../models/ProductCategory')
const mongoose = require('mongoose')

exports.get = async (req, res) => {
    try {
        res.status(200).json(await ProductCate.find());
    } catch (err) {
        console.debug(err.message, err)
        res.status(500).send({ message: 'Something went wrong!' })
    }
}

exports.getById = async (req, res) => {
    try {
        const ProductCate = await ProductCate.findById(req.params.id)
        if(!ProductCate) {
            return res.status(404).json({ message: 'Invalid product id' })
        }
        res.status(200).json(ProductCate)
    } catch(err) {
        console.debug(err.message, err)
        res.status(500).send({ message: 'Something went wrong!' })
    }
}

exports.create = async (req, res) => {
    try {
        await ProductCate.create(req.body)
        res.status(200).json(await ProductCate.find());   
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
        if(! await ProductCate.findOneAndUpdate({_id: req.params.id}, req.body)) {
            return res.status(404).json({ message: 'Invalid product id' })
        }
        res.status(200).json(await ProductCate.find())
    } catch(err) {
        console.debug(err.message, err)
        res.status(500).send({ message: 'Something went wrong!' })
    }
}

exports.delete = async (req, res) => {
    try {
        if (! await ProductCate.findOneAndDelete({_id: req.params.id})) {
            return res.status(404).json({ message: 'Invalid product id' })
        }
        res.status(422).json(await ProductCate.find())
    } catch(err) {
        console.debug(err.message, err)
        res.status(500).send({ message: 'Something went wrong!' })

    }
}