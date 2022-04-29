const Category = require('../models/CategoryModel')
const Position = require('../models/PositionModel')

class CategoryController {
  async getAll(req, res) {
    try {
      const categories = await Category.find({ user: req.user.userId })
      res.status(200).json(categories)
    } catch (e) {
      res.status(500).json('Server error 500')
    }
  }

  async getById(req, res) {
    try {
      const categorie = await Category.findById({ _id: req.params.id })
      res.status(200).json(categorie)
    } catch (e) {
      res.status(500).json('Server error 500')
    }
  }

  async remove(req, res) {
    try {
      await Category.remove({ _id: req.params.id })
      await Position.remove({ category: req.params.id })
      res.status(200).json({ message: 'Категория удалена' })
    } catch (e) {
      res.status(500).json('Server error 500')
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
      res.status(500).json('Server error 500')
    }
  }

  async update(req, res) {
    try {
      const updated = {
        name: req.body.name
      }
      if(req.file)
        updated.imageSrc = req.file.path
      const category = await Category.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updated },
        { new: true }
      )
      res.status(200).json(category)
    } catch (e) {
      res.status(500).json('Server error 500')
    }
  }
}

module.exports = new CategoryController()