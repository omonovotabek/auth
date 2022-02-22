const express = require('express')
const userRouter = require('./routers/userRouter')
const app = express()
    
      // thrid-party middleware //
app.use(express.json())

      // route middleware //
app.use('/api', userRouter)

module.exports = app