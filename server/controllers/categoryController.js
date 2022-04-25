const Category = require('../models/CategoryModel')
const Position = require('../models/PositionModel')

class CategoryController {
  async getAll(req, res) {
    try {
      const categories = await Category.find({ user: req.user.id })
      res.status(200).json(categories)
    } catch (e) {
      console.log(res, e)
    }
  }

  async getById(req, res) {
    try {
      const categorie = await Category.findById({ _id: req.params.id })
      res.status(200).json(categorie)
    } catch (e) {
      console.log(res, e)
    }
  }

  async remove(req, res) {
    try {
      await Category.remove({ _id: req.params.id })
      await Position.remove({ category: req.params.id })
      res.status(200).json({ message: 'Категория удалена' })
    } catch (e) {
      console.log(res, e)
    }
  }

  async create(req, res) {
    try {
      // console.log(req.file)
      const category = await Category.create({
        name: req.body.name,
        user: req.user.userId,
        imageSrc: req.file ? req.file.path : ''
      })
      res.status(201).json(category)
    } catch (e) {
      console.log(res, e)
    }
  }

  async update(req, res) {
    try {
      const updated = {}
      const category = await Category.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updated },
        { new: true }
      )
      res.status(200).json(category)
    } catch (e) {
      console.log(res, e)
    }
  }
}

module.exports = new CategoryController()