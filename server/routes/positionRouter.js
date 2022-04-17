const {Router} = require('express')
const controller = require('../controllers/positionController')
const {auth} = require('../middleware/auth')
const router = Router()

router.get('/:categoryId', auth, controller.getByCategoryId)
router.post('/', auth, controller.create)
router.patch('/:id', auth, controller.update)
router.delete('/:id', auth, controller.remove)

module.exports = router