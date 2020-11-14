const express = require('express')
const router = express.Router()
const { requireSignin, adminMiddleware } = require('../common-middleware')
const { addCategory, getCategories } = require('../controller/categoryController')


router.post('/category/create', requireSignin, adminMiddleware, addCategory)
router.get('/category/getcategory', getCategories)

module.exports = router