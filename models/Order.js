const mongoose = require('mongoose')

// 1. Define the blueprint (Schema)
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type:  Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }
})

// 2. Compile the schema into a Model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order
