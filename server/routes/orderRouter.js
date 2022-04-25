const {Router} = require('express')
const {getAll, create} = require('../controllers/orderController')
const {auth} = require('../middleware/auth')
const router = Router()

router.get('/', auth, getAll)
router.get('/', auth, create)

module.exports = router