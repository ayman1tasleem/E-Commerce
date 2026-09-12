require('dotenv').config()
const express = require('express');
const connectDB = require('./db')
const productRoutes = require('./routes/productRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())
connectDB()

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});