const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// GET API
router.get('/', async (req, res) => {
    try{
        const getProduct = await Product.find()
        res.json(getProduct)
    } catch (error) {
        console.log(error.message)
         res.status(500).json({msg: "Failed to fetch products"})
    }
});

// GET API /:id
router.get('/:id', async (req, res) => {
    try{
        const getProductId = await Product.findById(req.params.id)

        if(getProductId === null){
            res.status(404).json({msg: "Not Found"})
            return
        }
        res.json(getProductId)
    } catch (error) {
        console.log(error.message)
         res.status(500).json({msg: "Failed to fetch product"})
    }
});

// POST API
router.post('/', async (req, res) => {
    try{
        const newProduct = new Product ({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            stock: req.body.stock
        })
        await newProduct.save()
       res.status(201).json(newProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg: "Failed to create new Product"})
    }    
});

// PUT API
router.put('/:id', async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
            new: true
            }
        )
        
        if(updatedProduct === null){
            res.status(404).json({msg: "Not Found"})
            return
        }

        res.json(updatedProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg: "Failed to update product"})
    }
});

// DELETE API
router.delete('/:id', async (req, res) => {
    try{
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)

        if(deleteProduct === null){
            res.status(404).json({msg: "Not Found"})
            return
        }

        res.json({msg: "Product Deleted Successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg: "Failed to delete product"})
    }
});


module.exports = router
