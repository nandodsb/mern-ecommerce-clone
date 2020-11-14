const mongoose = require('mongoose')

const schemaTypes = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({ 

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
        default: 1,
        required: true
      },

      price: {
        type: Number, required: true
      }
    }
  ]


    
}, { timestamps: true}
)

module.exports = mongoose.model('Cart', cartSchema)