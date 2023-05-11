const Category = require("../models/category");


exports.getCategories = async (req,res,next) =>{
    try {
        const categories = await Category.find({});
        const data =[]
        for (let index = 0; index < categories.length; index++) {

            data.push({value:categories[index].id, label:categories[index].name,img:categories[index].categoryImage})
        }
        res.status(200).json({
            data:data
        })
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
   
}


exports.deleteCategory = async (req, res, next) => {
    try {
     const categoryId = req.params.id;
     await Category.findByIdAndDelete(categoryId);
     res.status(200).json({
      data: null,
      message: 'category has been deleted'
     });
    } catch (error) {
     next(error)
    }
}   

exports.createCategory = async(req, res, next) => {
    const categorie = new Category({
        name:req.body.name,
        categoryImage:req.file.path
    })
    try {
        const c = await categorie.save()
        res.json(c)
    } catch (error) {
        res.send('Error' + error)
    }
}

exports.getById = async(req,res,next) =>{
    try {
        const cat =await Category.findById(req.params.id)
        res.status(200).json({
            data: cat,
            message: '  ',
          })
    } catch (error) {
        res.status(400).send('Error' + error)
    }
}