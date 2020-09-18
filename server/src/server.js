const express = require('express')
const env = require('dotenv')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/key')

//ANCHOR Routes
const userRoutes = require('./routes/user')

//ANCHOR Variables
env.config()

//ANCHOR Mongoose Connection
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log(err))

//ANCHOR Middleware Body Parser
app.use(bodyParser.json())
app.use('/api', userRoutes)

//ANCHOR Server Port
const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
