require('dotenv').config()

const express = require('express')
const cors = require('cors')
const route = require('./routes')
const portServer = process.env.PORT_SERVER
const morgan = require('morgan')

let app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/qr', express.static('qr'))
app.use('/uploads', express.static('uploads'))

app.use(morgan('dev'))
app.use('/', route)

app.listen(portServer, ()=>{
    console.log(`Server listen on ${portServer}`)
})

module.exports = app