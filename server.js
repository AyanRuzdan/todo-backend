const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000
const taskRoutes = require('./routes/taskRoutes')
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Mongoose')
}).catch((err) => {
    console.error('Error connecting to Mongoose: ', err)
})
app.get('/', (req, res) => {
    res.send('TODO API is running')
})
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
app.use('/tasks', taskRoutes)