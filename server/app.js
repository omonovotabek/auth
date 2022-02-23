const express = require('express')
const userRouter = require('./routers/userRouter')
const analyticsRouter = require('./routers/analyticsRouter')
const categoryRouter = require('./routers/categoryRouter')
const orderRouter = require('./routers/orderRouter')
const positionRouter = require('./routers/positionRouter')
const app = express()
    
      // thrid-party middleware //
app.use(require('morgan')('dev')) // terminal => POST /api/user/signUp 200 454.055 ms - 159
app.use(express.json())
// app.use(require('cors'))

      // route middleware //
app.use('/api/user', userRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/category', categoryRouter)
app.use('/api/order', orderRouter)
app.use('/api/position', positionRouter)

module.exports = app