const router = require('express').Router()
const db = require('../models')

// GET /categories - READ all categoires
router.get('/', async (req, res) => {
  try {
    const categories = await db.category.findAll()
    res.json({ categories: categories })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

// POST /categories - CREATE a new category
router.post('/', async (req, res) => {
  try {
    const [category, created] = await db.category.findOrCreate({ 
      where: {
        name: req.body.name,
      }
    })
    res.redirect(`/categories/${category.id}`)
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

// GET /categories/:id - READ one category and include all projects
router.get('/:id', async (req, res) => {
  try {
    const category = await db.category.findByPk(req.params.id, { include: [db.project] })
    res.json({ category: category })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'bad request' })
  }
})

module.exports = router