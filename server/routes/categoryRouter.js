const {Router} = require('express')
const Category = require('../controllers/categoryController')
const {imgUpload} = require('../middleware/filesUpload')
const {auth} = require('../middleware/auth')
const router = Router()

router.get('/', auth, Category.getAll)
router.get('/:id', auth, Category.getById)
router.delete('/:id', auth, Category.remove)
router.post('/', auth, imgUpload, Category.create)
router.patch('/:id', auth, imgUpload, Category.update)

module.exports = router