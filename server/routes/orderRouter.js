const {Router} = require('express')
const controller = require('../controllers/orderController')
const {auth} = require('../middleware/auth')
const router = Router()

router.get('/', auth, controller.getAll)
router.get('/', auth, controller.create)

module.exports = router