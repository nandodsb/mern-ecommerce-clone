const Category = require('../models/category')
const slugify = require('slugify')

function createCategories(categories, parentId = null) {

  const categoryList = []
  let category
  if(parentId == null) {
    category = categories.filter(allParentCategoriesWithNoParentId => allParentCategoriesWithNoParentId.parentId == undefined)
  } else {
    category = categories.filter( allParentCategoriesWithNoParentId => allParentCategoriesWithNoParentId.parentId == parentId)
  }

  for(let thisCategory of category){
    categoryList.push({
      _id: thisCategory._id,
      name: thisCategory.name,
      slug: thisCategory.slug,
      children: createCategories(categories, thisCategory._id)
    })
  }

  return categoryList
}

exports.addCategory = (req, res) => {

  const categoryObject = {
    name: req.body.name,
    slug: slugify(req.body.name)

  }

  if(req.body.parentId){
    categoryObject.parentId = req.body.parentId
  } 

  const category = new Category(categoryObject)
  category.save((error, categoryAdded) => {
    if(error) return res.status(400).json({ error })

    if(categoryAdded) {
      return res.status(201).json({ categoryAdded })
    }
  })
}

exports.getCategories = (req, res) => {
  Category.find({})
  .exec((error, categories) => {
    if(error) return res.status(400).json({ error })

    if(categories){
      const categoryList = createCategories(categories)
      res.status(200).json({categoryList})
    }
  })
}