const {Router} = require('express')
const Position = require('../controllers/positionController')
const {auth} = require('../middleware/auth')
const router = Router()

router.get('/:categoryId', auth, Position.getByCategoryId)
router.post('/', auth, Position.create)
router.patch('/:id', auth, Position.update)
router.delete('/:id', auth, Position.remove)

module.exports = router