const jwt = require('jsonwebtoken')
const config = require('config')

module.exports.auth = (req, res, next) => {
    const token = req.header('x-auth-token')
     if(!token)
       return res.status(401).send('Token bo\'lmaganligi sababli murojat rad etildi')

     try {
         const decoded = jwt.verify(token, config.get('jwtSecretKey'))
         req.user = decoded
         next()
     } catch (e) {
         return res.status(400).send('Yaroqsiz token')
     }
}