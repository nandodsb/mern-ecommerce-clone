const Category = require('../../models/category')
const Product = require('../../models/product')

function createCategories(categories, parentId = null) {
    const categoryList = []
    let category
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined)
    } else {
        category = categories.filter((cat) => cat.parentId == parentId)
    }

    for (let thisCategory of category) {
        categoryList.push({
            _id: thisCategory._id,
            name: thisCategory.name,
            slug: thisCategory.slug,
            parentId: thisCategory.parentId,
            children: createCategories(categories, thisCategory._id),
        })
    }

    return categoryList
}

exports.initialData = async (req, res) => {
    const categories = await Category.find({}).exec()
    const products = await Product.find({})
        .select(
            '_id name price quantity slug description productPictures categoryId'
        )
        .populate({ path: 'category', select: '_id name' })
        .exec()

    res.status(200).json({
        categories: createCategories(categories),
        products,
    })
}
