const router = require('express').Router()
const userRoute = require('./user')

router.get('/', (req, res) => {
    res.send('Welcome to API Megafit')
})

module.exports = router