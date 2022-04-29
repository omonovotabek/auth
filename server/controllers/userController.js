const { User, validateSignIn, validateSignUp } = require('../models/UserModel')
const bcrypt = require('bcrypt')

class UserController {
  async signUp(req, res) {
    const { error } = validateSignUp(req.body)
    if (error)
      return res.status(400).json(error.details[0].message)
    try {
      const { name, email, password } = req.body
      const candidat = await User.findOne({ email })
      if (candidat)
        return res.status(200).json({message:'Ползовател уже создан', type:'error'})

      const hashPassword = await bcrypt.hash(password, 10)
      await User.create({ name, email, password: hashPassword })
      res.status(201).json({message:'Ползовател создан', type:'created'})
    } catch (e) {
      res.status(500).json({message:'Server error 500'})
    }
  }

  async signIn(req, res) {
    const { error } = validateSignIn(req.body)
    if (error)
      return res.status(400).json(error.details[0].message)
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user)
        return res.status(200).json({message:'Ползовател не найден', type:'error-1'})
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword)
        return res.status(200).json({message:'Парол не правилна', type:'error-2'})
      const token = user.generateAuthToken()
      res.status(200).json({message:'Пожалуста ввойдите в система', type:'success', token})
    } catch (e) {
      res.status(500).json({message:'Server error 500'})
    }
  }
}

module.exports = new UserController()