const Position = require('../models/PositionModel')
const errorHandler = require('../utils/errorHandler')

getByCategoryId = async (req, res) => {
  try {
      const positions = await Position.find({
         category: req.params.categoryId,
         user:req.user.id 
      })
      res.status(200).json(positions)
  } catch (e) {
      errorHandler(res, e)
  }
}

create = async (req, res) => {
  try {
      const position = await Position.create({
          name: req.body.name,
          cost: req.body.cost,
          category: req.body.category,
          user: req.user.id
      })
      res.status(201).json(position)
  } catch (e) {
      errorHandler(res, e)      
  }
}

update = async (req, res) => {
  try {
      const positon = await Position.findOneAndUpdate(
        {_id:req.params.id},
        {$set: req.body},
        {new: true}
        )
      res.status(200).json(positon)
  } catch (e) {
      errorHandler(res, e)
  }
}

remove = async (req, res) => {
   try {
       await Position.remove({_id: req.params.id})
       res.status(200).json({
           message: 'Позиция была удалена.'
       })
   } catch (e) {
       errorHandler(res, e)
   }
}

module.exports = {
    getByCategoryId,
    create,
    update,
    remove
}