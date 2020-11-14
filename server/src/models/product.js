const mongoose = require('mongoose')
const mongoSchema = mongoose.Schema

const schemaTypes = mongoSchema.Types.ObjectId

const productSchema = new mongoSchema(
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
      userId: {type: schemaTypes, ref: 'User'},
      review: String
    }
  ],

  category:  {
    type: schemaTypes, ref: 'Category', required: true
  },

  createdBy: {
    type: schemaTypes, ref: 'User', required: true
  },

  updatedAt: Date,


}, { timestamps: true})

module.exports = mongoose.model('Product', productSchema)