const express = require('express')
const router = express.Router()
const { requireSignin, userMiddleware } = require('../common-middleware')
const { addItemToCart } = require('../controller/cartController')


router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart)


module.exports = router