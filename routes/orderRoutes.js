const express = require('express')
const router = express.Router()
const Order = require('../models/Order')


// GET API
router.get('/', async (req, res) => {
    try{
        const getOrder = await Order.find()
        res.json(getOrder)
    } catch (error) {
        console.log(error.message)
         res.status(500).json({msg: "Failed to fetch orders"})
    }
});

// GET API /:id
router.get('/:id', async (req, res) => {
    try{
        const getOrderId = await Order.findById(req.params.id)

        if(getOrderId === null){
            res.status(404).json({msg: "Not Found"})
            return
        }
        res.json(getOrderId)
    } catch (error) {
        console.log(error.message)
         res.status(500).json({msg: "Failed to fetch order"})
    }
});

// POST API
router.post('/', async (req, res) => {
    try{
        const newOrder = new Order ({
            user: req.body.user,
            items: req.body.items,
            totalAmount: req.body.totalAmount
        })
        await newOrder.save()
       res.status(201).json(newOrder)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg: "Failed to create new Order"})
    }    
});

module.exports = router
