const router = require('express').Router()
const userRoute = require('./user')
const classRoute = require('./class')
const packageMembershipRoute = require('./packageMembership')
const checkinRoute = require('./checkin')
const positionRoute = require('./position')

router.get('/', (req, res) => {
    res.send('Welcome to API Megafit')
})

router.use('/users', userRoute)
router.use('/classes', classRoute)
router.use('/package-memberships', packageMembershipRoute)
router.use('/checkin-checkout', checkinRoute)
router.use('/position', positionRoute)

module.exports = router