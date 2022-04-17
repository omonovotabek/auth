const {Router} = require('express')
const {signIn, signUp} = require('../controllers/userController')

const router = Router()

router.post('/signUp', signUp)
router.post('/signIn', signIn)

module.exports = router
