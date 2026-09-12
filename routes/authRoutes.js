const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// POST API
router.post('/register', async (req, res) => {
    try{
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User ({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()
       res.status(201).json({
        msg: "User registered successfully",
        user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
       })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg: "Failed to create new User"})
    }    
});

// POST API
router.post('/login', async (req, res) => {
    try{
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email: email })

        if(!user){
            res.status(404).json({msg: "Invalid email or password"})
            return
        }

        const isMatch = await bcrypt.compare( password , user.password )

        if(!isMatch){
            res.status(404).json({msg: "Invalid email or password"})
            return
        }

        res.status(200).json({
            msg: "Login Successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({msg: "Failed to login"})
    }    
});

module.exports = router
