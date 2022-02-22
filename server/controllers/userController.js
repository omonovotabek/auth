const {User, validateSignIn, validateSignUp} = require('../models/UserModel')
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')


signUp = async (req, res) => {
  try {
      const {error} = validateSignUp (req.body)
      if(error)
        return res.status(400).send(error.details[0].message)
      
      const {name, email, password} = req.body
      let user = await User.findOne({email})
      if(user)
        return res.status(400).send('Mavjud bo\'lgan foydalanuvchi')

      const hashPassword = await bcrypt.hash(password, 10)
      user = await User.create({name, email, password: hashPassword})
      res.send(user)
  } catch (e) {
      console.log(e);
  }
}

signIn = async (req, res) => {
    try {
       const {error} = validateSignIn(req.body)
       if(error)
         return res.status(400).send(error.details[0].message)

       const {email, password} = req.body 
       const user = await User.findOne({email})
       const isValidPassword = await bcrypt.compare(password, user.password)
       if(!user && !isValidPassword)
         return res.status(400).send('Email yoki parol notog\'ri')
       
       const token = jwt.sign(
           {userId:user.id}, 
           config.get('jwtSecretKey'),
           {expiresIn: '1h'}
           )
           
       res.header('x-auth-token', token).send(true)

    } catch (e) {
        console.log(e)
    }
  }

  module.exports = {
      signIn, signUp
  }