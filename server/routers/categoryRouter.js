const {Router} = require('express')
const controller = require('../controllers/categoryController')
const {imgUpload} = require('../middleware/filesUpload')
const {auth} = require('../middleware/auth')
const router = Router()

router.get('/', auth, controller.getAll)
router.get('/:id', auth, controller.getById)
router.delete('/:id', auth, controller.remove)
router.post('/', auth, imgUpload, controller.create)
router.patch('/:id', auth, imgUpload, controller.update)

module.exports = router