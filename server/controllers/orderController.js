const Order = require('../models/OrderModel')

class OrderController {
  async getAll(req, res) {
    try {
      const query = {
        user: req.user.userId
      }

      if (req.query.start) {
        query.date = {
          $gte: req.query.start
        }
      }

      if (req.query.end) {
        if (!query.date) {
          query.date = {}
        }
        query.date['$lte'] = req.query.end
      }
      if (req.query.order) {
        query.order = +req.query.order
      }
      const orders = await Order
        .find(query)
        .sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit)

      res.status(200).json(orders)
    } catch (e) {
      res.status(500).json('Server error 500')
    }
  }

  async create(req, res) {
    try {
      const lastOrder = await Order
        .findOne({ user: req.user.userId })
        .sort({ date: -1 })
      const maxOrder = lastOrder ? lastOrder.order : 0

      const order = await Order.create({
        list: req.body.list,
        user: req.user.userId,
        order: maxOrder + 1
      })
      res.status(201).json(order)
    } catch (e) {
      res.status(500).json('Server error 500')
    }
  }
}

module.exports = new OrderController()