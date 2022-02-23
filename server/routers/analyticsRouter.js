const {Router} = require('express')
const controller = require('../controllers/analyticsController')
const router = Router()

router.get('/overview', controller.getOverview)
router.get('/analytics', controller.getAnalytics)

module.exports = router