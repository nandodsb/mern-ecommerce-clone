const mongoose = require('mongoose')
const mongoSchema = mongoose.Schema
const schemaTypes = mongoSchema.Types.ObjectId

const pageSchema = new mongoSchema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        banners: [
            {
                img: {
                    type: String,
                },
                navigateTo: { type: String },
            },
        ],

        products: [
            {
                img: {
                    type: String,
                },
                navigateTo: { type: String },
            },
        ],

        category: { type: schemaTypes, ref: 'Category', required: true },

        createdBy: {
            type: schemaTypes,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Page', pageSchema)
