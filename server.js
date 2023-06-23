require('dotenv').config()
require('./app/models')

const express = require('express')
const app = express()
const cors = require('cors')

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(
        require('cookie-session')({
          name: 'session',
          keys: [process.env.COOKIE_SECRET],
          httpOnly: true,
          sameSite: 'strict'
        })
    )

app.listen(process.env.PORT, () => console.debug('Server is running'))

require('./app/routes')(app)