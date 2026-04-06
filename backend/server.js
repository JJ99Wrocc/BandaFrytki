require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');

const app = express();

// Middleware - to musi być tutaj, żeby serwer widział dane z Reacta!
app.use(cors());
app.use(express.json());

// Połączenie z bazą
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Połączono z MongoDB Atlas!'))
    .catch(err => console.error('❌ Błąd połączenia:', err));

// Endpoint do zamówień
app.post('/api/orders', async (req, res) => {
    try {
        const { size } = req.body;

        const newOrder = new Order({
            productName: "BANDA FRYTKI TEE",
            size: size,
            quantity: 1,
            price: 120
        });

        const savedOrder = await newOrder.save();
        console.log("✅ Nowe zamówienie wpadło do bazy!");

        res.status(201).json({ 
            success: true, 
            message: "Zamówienie zapisane w bazie!",
            orderId: savedOrder._id 
        });
    } catch (err) {
        console.error("❌ Błąd zapisu:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
}); // <--- TU SIĘ KOŃCZY POST

// START SERWERA - TO MUSI BYĆ NA ZEWNĄTRZ
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serwer śmiga na porcie ${PORT}`);
});