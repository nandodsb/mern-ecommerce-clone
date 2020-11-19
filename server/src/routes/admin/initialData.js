const express = require('express')
const { initialData } = require('../../controller/admin/initialDataController')
const router = express.Router()

router.post('/initialData', initialData)

module.exports = router
