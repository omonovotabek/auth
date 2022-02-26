const Category = require('../models/CategoryModel')
const Position = require('../models/PositionModel')
const errorHandler = require('../utils/errorHandler')

getAll = async (req, res) => {
  try {
      const categories = await Category.find({user: req.user.id})
      res.status(200).json(categories)
  } catch (e) {
      errorHandler(res, e)
  }
}

getById = async (req, res) => {
    try {
        const categorie = await Category.findById({_id: req.params.id})
        res.status(200).json(categorie)
    } catch (e) {
        errorHandler(res, e)
    }
}

remove = async (req, res) => {
    try {
         await Category.remove({_id: req.params.id})
         await Position.remove({category: req.params.id}) 
        res.status(200).json({message: 'Категория удалена'})
    } catch (e) {
        errorHandler(res, e)
    }
}

create = async (req, res) => {
    try {
        // console.log(req.file)
      const category = await Category.create({
          name: req.body.name,
          user: req.user.userId,
          imageSrc: req.file ? req.file.path : ''
      })
      res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

update = async (req, res) => {
    try {
      const updated = {}
      const category = await Category.findOneAndUpdate(
          {_id: req.params.id},
          {$set:updated},
          {new: true}
      )
      res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports = {
    getAll,
    getById,
    remove,
    create,
    update
}