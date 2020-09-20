const express = require('express')
const router = express.Router()
const { signup } = require('../controller/auth')

router.get('/signin', (req, res) => {})

router.post('/signup', signup)

module.exports = router
