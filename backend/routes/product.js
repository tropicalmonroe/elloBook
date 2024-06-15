const router = require("express").Router()
const Product = require("../models/Product")

{/*const multer = require("multer")
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage,
    limits: {fileSize:50 * 1024 * 1024}
})*/}

//create
router.post("/", async (req, res) => { {/*,upload.single('coverPhotoURL')*/}
    console.log('Request body:', req.body); // Log the request body
    try {
        const { title, author, readingLevel, coverPhotoURL } = req.body;
        const newProduct = new Product({ title, author, readingLevel, coverPhotoURL });
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
      } catch (error) {
        console.error('Error saving product:', error);
        if (error.code === 11000) { // MongoDB duplicate key error code
          res.status(400).json({ message: 'Duplicate key error', error });
        } else {
          res.status(500).json({ message: 'Internal Server Error', error });
        }
      }
});

//UPDATE
router.put("/:id", async (req, res) => {
    try {
      const updatedProducts = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProducts);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
   // Delete
   router.delete("/:id", async (req, res)=>{
      try {
          await Product.findByIdAndDelete(req.params.id)
          res.status(200).json("Deleted successfully")
      } catch (error) {
          res.status(500).json(error)
      }
   })
   
  //Get Product
  router.get("/find/:id", async(req, res)=>{
      try {
          const product = await Product.findById(req.params.id)
          
          res.status(200).json(product)
      } catch (error) {
          res.status(500).json(error)
      }
  })
  
  
  //GET ALL PRODUCTS
  router.get("/", async(req,res)=>{
      const qNew = req.query.new
      const qCat = req.query.category
      try {
          let products;
  
          if (qNew) {
              products = await Product.find().sort({createdAt: -1}).limit(7)
          } else if (qCat) {
              products = await Product.find({
                  category: {
                      $in: [qCat],
                  }, 
              })
          } else {
              products = (await Product.find())
          }
          
          res.status(200).json(products)
      } catch (error) {
          res.status(500).json(error)
      }
  })

module.exports = router