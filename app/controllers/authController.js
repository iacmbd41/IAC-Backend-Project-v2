const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

exports.signUp = async (req, res) => {
    try {
        res.status(200).json(await User.create({
            ...req.body,
            password: bcrypt.hashSync(req.body.password)
        }))
    } catch (err) {
        console.debug(err.message, err)
        res.status(500).send({ message: 'Something went wrong!' })
    }
}

exports.signIn = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(401).send({ message: 'Invalid Your Username' })
        }

        const isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid Your Password' })
        }

        const token = jwt.sign(
            { 
                id: user.id,
                role: user.role,
            },
            process.env.SECRET,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 60 * 60 * 24,
            }
        )

        req.session.token = token
        console.debug('session:', req.session)

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        })
    } catch (err) {
        console.debug(err.message, err)
        res.status(500).send({ message: 'Something went wrong!' })
    }
}

exports.signOut = (req, res) => {
    try {
        // req.session.destroy
        req.session = null
        console.log('session:', req.session)
        return res.status(200).send({ message: 'Signed out successfully.' })
    } catch (err) {
        console.debug(err.message, err);
        res.status(500).send({ message: 'Something went wrong!' })
    }
}