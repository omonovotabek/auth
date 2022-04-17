const express = require('express')
const userRouter = require('./routes/userRouter')
const analyticsRouter = require('./routes/analyticsRouter')
const categoryRouter = require('./routes/categoryRouter')
const orderRouter = require('./routes/orderRouter')
const positionRouter = require('./routes/positionRouter')
const app = express()
    
      // thrid-party middleware //
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use(require('morgan')('dev')) 
      // route middleware //
app.use('/api/user', userRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/category', categoryRouter)
app.use('/api/order', orderRouter)
app.use('/api/position', positionRouter)

module.exports = app



// app.use(require('morgan')('dev')) // terminal => POST /api/user/signUp 200 454.055 ms - 159