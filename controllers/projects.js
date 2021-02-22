let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - CREATE a new project and add categories
router.post('/', async (req, res) => {
  try {
    const projectOptions = {
      where: {
        name: req.body.name,
        githubLink: req.body.githubLink,
        deployLink: req.body.deployLink,
        description: req.body.description
      }
    } 
    const categoryOptions = {
      where: {
        name: req.body.category
      }
    }
    const [project, projectCreated] = await db.project.findOrCreate(projectOptions)
    const [category, categoryCreated] =  await db.category.findOrCreate(categoryOptions)
    await project.addCategory(category)
    res.redirect('/')
  } catch(error) {
    console.log(error)
    res.status(400).json(error)
  }
})

// GET /projects/:id - READ a specific project
router.get('/:id', async (req, res) => {
  try {
    const project = await db.project.findOne({
      where: { id: req.params.id },
      include: [db.category]
    })
    res.json({ project: project })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

// POST /projects/:id/categories - CREATE an association between a specific project and a category
router.post('/:id/categories', async (req, res) => {
  try {
    const project = await db.project.findByPk(req.params.id)
    if(!project) throw new Error('project not found')
    const [category, created] = await db.category.findOrCreate({
      where: {
        name: req.body.name
      }
    })
    await project.addCategory(category)
    res.redirect(`/projects/${project.id}`)
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

module.exports = router
