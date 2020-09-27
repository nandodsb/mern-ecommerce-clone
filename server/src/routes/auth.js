const express = require('express')
const router = express.Router()
const { signup, signin, requireSignin } = require('../controller/auth')

router.get('/signin', signin)
router.post('/signup', signup)

router.post('/profile', requireSignin, (req, res) => {
    res.status(200).json({ user: 'profile' })
})

module.exports = router
