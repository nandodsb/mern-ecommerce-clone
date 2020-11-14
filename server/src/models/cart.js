const mongoose = require('mongoose')
const mongoSchema = mongoose.Schema
const schemaTypes = mongoSchema.Types.ObjectId

const cartSchema = new mongoSchema({ 

  user: {
    type: schemaTypes, ref:'User', required: true
  },

  cartItems: [
    {
      product: {
        type: schemaTypes, ref:' Product', required: true
      },

      quantity: {
        type: Number,
        default: 1
      },

      price: {
        type: Number, 
        required: true
      }
    }
  ]    

}, { timestamps: true})

module.exports = mongoose.model('Cart', cartSchema)