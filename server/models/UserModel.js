const {Schema, model} = require('mongoose')
const Joi = require('joi')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
      }
})

const User = model('users', userSchema)

function validateSignUp (candidat) {
    const schema = Joi.object ({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(candidat)
}

function validateSignIn (candidat) {
    const schema = Joi.object ({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(candidat)
}

module.exports = {
    User, validateSignUp, validateSignIn
}