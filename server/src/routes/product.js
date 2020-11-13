const express = require('express')
const router = express.Router()
const { requireSignin, adminMiddleware } = require('../common-middleware')
//const { addCategory, getCategories } = require('../controller/category')
const Product = require('../models/product')


router.post('/product/create', requireSignin, adminMiddleware, (req, res) => {
  res.status(200).json({ message: 'hello'})
})
//router.get('/category/getcategory', getCategories)

module.exports = router