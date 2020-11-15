const Cart = require('../models/cart')

exports.addItemToCart = (req, res) => {

  Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error })

      if (cart) {
        //if cart already exists then update cart by quantity

        const addedQuantity = req.body.cartItems.quantity
        const product = req.body.cartItems.product
        const item = cart.cartItems.find(isItemAdded => isItemAdded.product == req.body.cartItems.product)
        let condition, update



        if (item) {

          condition = { "user": req.user._id, "cartItems.product": product }
          update = {
            "$set": {
              "cartItems.$": {...req.body.cartItems, quantity: item.quantity + addedQuantity}
            }
          }

          Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": product}, {
            "$set": {
              "cartItems.$": {...req.body.cartItems, quantity: item.quantity + addedQuantity}
            }
          }).exec((error, _cart) => {
            if (error) return res.status(400).json({ error })
  
            if (_cart) {
              return res.status(201).json({ cart: _cart })            
            }
          }) 

        } else {

          condtion = { user: req.user._id }
          update = {
            "$push": {
              "cartItems": req.body.cartItems
            }
          }
        } 

          Cart.findOneAndUpdate(condition, update)
          .exec((error, _cart) => {
            if (error) return res.status(400).json({ error })
  
            if (_cart) {
              return res.status(201).json({ cart: _cart })            
            }
          })
      } else {
        //if cart doesn't exist then create new cart
        const cart = new Cart({
          user: req.user._id,
          cartItems: [req.body.cartItems]    
        })  
      
        cart.save((error, cart) => {
          if (error) return res.status(400).json({ error })
          if (cart) {
            return res.status(201).json({ cart })            
          }
        }, //console.log(cart)
        )
      }
    })    
}