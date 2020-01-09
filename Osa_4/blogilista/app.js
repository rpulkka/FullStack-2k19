const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const mongoUrl = 'mongodb+srv://rpulkka:ohth5ieh@fullstack2020-uzswm.mongodb.net/bloglist?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

module.exports = app