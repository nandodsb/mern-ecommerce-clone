const User = require('../models/user')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/jwtSecret')

//SECTION Signup
exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (user)
            return res.status(400).json({
                message: 'User already registered',
            })

        const { firstName, lastName, email, password } = req.body
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            userName: Math.random().toString(),
        })

        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: 'Something went wrong',
                    error,
                })
            }

            if (data) {
                return res.status(201).json({
                    message: 'User created successfully',
                    user: data,
                })
            }
        })
    })
}

//SECTION Signin
exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (error) {
            return res.status(400).json(error)
            //console.log(error)
        }
        if (user) {
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign({ id: user._id }, jwtSecret, {
                    expiresIn: '1h',
                })
                const { firstName, lastName, email, role, fullName } = user
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName,
                    },
                })
            } else {
                return res.status(400).json({ message: 'Invalid password' })
            }
        } else {
            return res.status(400).json({ message: 'Something went wrong' })
            //console.log(error)
        }
    })
}

//SECTION Require Signin
exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, jwtSecret)
    req.user = user
    next()
}
