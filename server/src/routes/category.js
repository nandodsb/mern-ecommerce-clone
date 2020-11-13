const express = require('express')
const router = express.Router()
const Category = require('../models/category')
const slugify = require('slugify')


router.post('/category/create', (req, res) => {

  const categoryObject = {
    name: req.body.name,
    slug: slugify(req.body.name)

  }

  if(req.body.parentId){
    categoryObject.parentId = req.body.parentId
  } 

  const category = new Category(categoryObject)
  category.save((error, categoryAdded) => {
    if(error) return res.status(400).json({ error })

    if(categoryAdded) {
      return res.status(201).json({ categoryAdded })
    }
  })
})

module.exports = router