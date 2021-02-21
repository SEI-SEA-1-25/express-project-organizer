// requried modules
const express = require('express')
const db = require('./models')
const rowdy = require('rowdy-logger')
const morgan = require('morgan')

// config express app
const app = express()
const PORT = 3000
const rowdyResults = rowdy.begin(app)

// express middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))


// GET / - READ all projects
app.get('/', async (req, res) => {
  try {
    const projects = await db.project.findAll()
    res.json({ projects: projects })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

// controllers
app.use('/projects', require('./controllers/projects'))

// 404 middleware
app.use(function(req, res, next) {
  res.status(404).json({ message: '404: not found' })
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
  rowdyResults.print()
})