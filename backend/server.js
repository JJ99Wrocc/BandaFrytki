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
        // Wyciągamy WSZYSTKO z req.body do jednej zmiennej
        const data = req.body; 

        const newOrder = new Order({
            productName: "BANDA FRYTKI TEE",
            size: data.size,
            quantity: 1,
            price: 85,
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone, // Teraz bierzemy to bezpośrednio z obiektu data
            deliveryMethod: data.deliveryMethod,
            selectedPoint: data.selectedPoint
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, orderId: savedOrder._id });
    } catch (err) {
        console.error("❌ BŁĄD:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
}); // <--- TU SIĘ KOŃCZY POST

// START SERWERA - TO MUSI BYĆ NA ZEWNĄTRZ
const PORT = 10000;
app.listen(PORT, () => {
    console.log(`🚀 Serwer śmiga na porcie ${PORT}`);
});