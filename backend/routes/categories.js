const express = require('express');
const router = express.Router();
const Category = require("../controller/categoryController")
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ||file.mimetype === 'image/webp'  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2048 * 2048 * 2
  },
  fileFilter: fileFilter
});


router.post('/create',upload.single('categoryImage'),Category.createCategory);
router.get('/Categories',Category.getCategories);
router.get('/:id', Category.getById)
router.delete('/delete/:id', Category.deleteCategory)
module.exports=router;