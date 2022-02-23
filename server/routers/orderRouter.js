const {Router} = require('express')
const controller = require('../controllers/orderController')
const router = Router()

router.get('/', controller.getAll)
router.get('/', controller.create)

module.exports = router