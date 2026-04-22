const mongoose = require('mongoose'); 

const orderSchema = new mongoose.Schema({ 
    productName: { type: String, required: true },
    size: { type: String, required: false },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    name: String,
    email: String,
    address: String,
    phone: String,
    deliveryMethod: String,
    selectedPoint: String,
    totalPrice: Number,
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }
});


module.exports = mongoose.model('Order', orderSchema, 'Frytki');