let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - CREATE a new project
router.post('/', async (req, res) => {
  try {
    await db.project.create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    })
    res.redirect('/')
  } catch(error) {
    res.status(400).json({ message: 'bad request' })
  }
})

// GET /projects/:id - READ a specific project
router.get('/:id', async (req, res) => {
  try {
    const project = await db.project.findOne({
      where: { id: req.params.id }
    })
    res.json({ project: project })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

module.exports = router
