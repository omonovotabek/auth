const {Router} = require('express')
const router = Router()
const userRouter = require('./userRouter')
const analyticsRouter = require('./analyticsRouter')
const categoryRouter = require('./categoryRouter')
const orderRouter = require('./orderRouter')
const positionRouter = require('./positionRouter')

router.use('/user', userRouter)
router.use('/analytics', analyticsRouter)
router.use('/category', categoryRouter)
router.use('/order', orderRouter)
router.use('/position', positionRouter)

module.exports = router