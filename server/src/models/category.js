const mongoose = require('mongoose')
const mongoSchema = mongoose.Schema

const categorySchema = new mongoSchema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

        type: {
            type: String,
        },
        categoryImage: {
            type: String,
        },

        parentId: {
            type: String,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Category', categorySchema)
