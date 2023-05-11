const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    categoryImage :{
        type: String, required:false
    }
    
})

const Category = mongoose.model('category', categorySchema);
module.exports = Category;