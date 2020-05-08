const router = require('express').Router()
const userRoute = require('./user')
const classRoute = require('./class')
const classPtRoute = require('./classPt')
const packageMembershipRoute = require('./packageMembership')
const subCategoryMembershipRoute = require('./subCategoryMembership')
const categoryMembershipRoute = require('./categoryMembership')
const checkinRoute = require('./checkin')
const positionRoute = require('./position')

router.get('/', (req, res) => {
    res.send('Welcome to API Megafit')
})

router.use('/users', userRoute)
router.use('/classes', classRoute)
router.use('/class-pts', classPtRoute)
router.use('/package-memberships', packageMembershipRoute)
router.use('/sub-category-memberships', subCategoryMembershipRoute)
router.use('/category-memberships', categoryMembershipRoute)
router.use('/checkin-checkout', checkinRoute)
router.use('/position', positionRoute)

module.exports = router
