const router = require('express').Router()
const userRoute = require('./user')
const classRoute = require('./class')
const classPtRoute = require('./classPt')
const historyPtRoute = require('./historyPt')
const packageMembershipRoute = require('./packageMembership')
const subCategoryMembershipRoute = require('./subCategoryMembership')
const categoryMembershipRoute = require('./categoryMembership')
const checkinRoute = require('./checkin')

router.get('/', (req, res) => {
    res.send('Welcome to API Megafit')
})

router.use('/users', userRoute)
router.use('/classes', classRoute)
router.use('/class-pts', classPtRoute)
router.use('/history-pts', historyPtRoute)
router.use('/package-memberships', packageMembershipRoute)
router.use('/sub-category-memberships', subCategoryMembershipRoute)
router.use('/category-memberships', categoryMembershipRoute)
router.use('/checkin-checkout', checkinRoute)

module.exports = router
