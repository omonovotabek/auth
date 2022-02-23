const {Router} = require('express')
const controller = require('../controllers/categoryController')
const upload = require('../middleware/upload')
const {auth} = require('../middleware/auth')
const router = Router()

router.get('/', auth, controller.getAll)
router.get('/:id', auth, controller.getById)
router.delete('/:id', auth, controller.remove)
router.post('/', auth, upload.single('image'), controller.create)
router.patch('/:id', auth, upload.single('image'), controller.update)

module.exports = router