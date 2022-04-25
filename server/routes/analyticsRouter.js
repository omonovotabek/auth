const {Router} = require('express')
const {getAnalytics, getOverview} = require('../controllers/analyticsController')
const router = Router()

router.get('/overview', getOverview)
router.get('/analytics', getAnalytics)

module.exports = router