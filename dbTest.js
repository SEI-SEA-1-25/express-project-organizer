const db = require('./models')

db.category.create({
  name: 'node'
}).then(function(category) {
  console.log(category.get())
})

async function createCategory() {
  try{
    // READ a project
    const project = await db.project.findOne({
      where: { id: 1 }
    })
    // CREATE a category
    const newCategory = await db.category.create({
      name: 'Express'
    })
    // associate the category and project
    await project.addCategory(newCategory)

  } catch(error) {
    console.log(error)
  }
}

createCategory()