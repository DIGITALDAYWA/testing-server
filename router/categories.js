const express = require('express')
const router = express.Router()
const { Category } = require('../models/category')
const mongoose = require('mongoose')

//Get Methods

router.get('/', async (req, res) => {
  const categoryList = await Category.find()

  if (!categoryList) {
    res.status(500).json({
      success: false,
    })
  }
  res.status(200).send(categoryList)
})

router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    res.status(400).send('Invalid category Id')
  const category = await Category.findById(req.params.id)

  if (!category) {
    res
      .status(500)
      .json({ message: 'The category with the given ID was not found.' })
  }
  res.status(200).send(category)
})

//Post Methods

router.post('/', async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  })
  category = await category.save()

  if (!category) return res.status(404).send('The category can not be created!')

  res.send(category)
})

//Delete Mothods

router.delete('/:id', async (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: 'The category is deleted',
        })
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'Category not found' })
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err })
    })
})

//Put Methods

router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    res.status(400).send('Invalid category Id')
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  )
  if (!category) return res.status(400).send('The category can not be updated!')

  res.send(category)
})

module.exports = router
