const Position = require('../models/PositionModel')

class PositionController {
  async getByCategoryId(req, res) {
    try {
      const positions = await Position.find({
        category: req.params.categoryId,
        user: req.user.id
      })
      res.status(200).json(positions)
    } catch (e) {
      console.log(res, e)
    }
  }

  async create(req, res) {
    try {
      const position = await Position.create({
        name: req.body.name,
        cost: req.body.cost,
        category: req.body.category,
        user: req.user.id
      })
      res.status(201).json(position)
    } catch (e) {
      console.log(res, e)
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
      console.log(res, e)
    }
  }

  async remove(req, res) {
    try {
      await Position.remove({ _id: req.params.id })
      res.status(200).json({
        message: 'Позиция была удалена.'
      })
    } catch (e) {
      console.log(res, e)
    }
  }
}

module.exports = new PositionController()