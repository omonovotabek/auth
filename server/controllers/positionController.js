const Position = require('../models/PositionModel')

class PositionController {
  async getByCategoryId(req, res) {
    try {
      const positions = await Position.find({
        category: req.params.categoryId,
        user: req.user.userId
      })
      res.status(200).json(positions)
    } catch (e) {
      res.status(500).json('Server error 500')
    }
  }

  async create(req, res) {
    try {
      const position = await Position.create({
        name: req.body.name,
        cost: req.body.cost,
        category: req.body.category,
        user: req.user.userId
      })
      res.status(201).json(position)
    } catch (e) {
      res.status(500).json('Server error 500')
    }
  }

  async update(req, res) {
    try {
      const positon = await Position.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      )
      res.status(200).json(positon)
    } catch (e) {
      res.status(500).json('Server error 500')
    }
  }

  async remove(req, res) {
    try {
      await Position.remove({ _id: req.params.id })
      res.status(200).json({
        message: 'Позиция была удалена.'
      })
    } catch (e) {
      res.status(500).json('Server error 500')
    }
  }
}

module.exports = new PositionController()