const mongoose = require('mongoose')
const mongoSchema = mongoose.Schema

const schemaTypes = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema(
  { 
    name: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
    required: true,
    unique: true
  },

  price: {
      type: Number,
      required: true     
  },

  quantity: {
      type: Number,
      required: true
  },

  description: {
      type: String,
      required: true,
      trim: true,
  },

  offer: {
    type: Number
  },

  productPictures: [
    {
      img: {
        type: String
      }
    }
  ],

  reviews: [
    {
      userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      review: String
    }
  ],

  category: {
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true}
  },

  createBy: {
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
  },

  updatedAt: Date,


}, { timestamps: true})

module.exports = mongoose.model('Product', productSchema)