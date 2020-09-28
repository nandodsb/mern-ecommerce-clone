const express = require('express')
const env = require('dotenv')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/key')

//SECTION Routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')

//SECTION Variables
env.config()

//SECTION Mongoose Connection
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log(err))

//SECTION Middleware Body Parser
app.use(bodyParser.json())
app.use('/api', authRoutes)
app.use('/api', adminRoutes)

//SECTION Server Port
const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
