const express = require('express')
const env = require('dotenv')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/key')

//Const
env.config()

app.use(express.json())

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello from Server',
    })
})

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body,
    })
})

const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
