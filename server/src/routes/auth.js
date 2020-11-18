const express = require('express')
const router = express.Router()
const { signup, signin, signout } = require('../controller/authUserController')
const {
    validateSignupRequest,
    validateSigninRequest,
    isRequestValidated,
} = require('../validators/auth')

//router.get('/test', test)

router.post('/signin', validateSigninRequest, isRequestValidated, signin)
router.post('/signup', validateSignupRequest, isRequestValidated, signup)
router.post('/signout', signout)

/**router.post('/profile', requireSignin, (req, res) => {
    res.status(200).json({ user: 'profile' })
})*/

module.exports = router
