require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

// Połączenie z bazą
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Połączono z MongoDB Atlas!'))
    .catch(err => console.error('❌ Błąd połączenia:', err));

// ==========================================
// 1. ENDPOINT DLA ZAMÓWIEŃ (SKLEP)
// ==========================================
app.post('/api/orders', async (req, res) => {
    try {
        const data = req.body; 

        const newOrder = new Order({
            productName: "BANDA FRYTKI TEE",
            size: data.size,
            quantity: 1,
            price: 85,
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone,
            deliveryMethod: data.deliveryMethod,
            selectedPoint: data.selectedPoint,
            totalPrice: data.totalPrice
        });

        const savedOrder = await newOrder.save();

        // WYSYŁKA MAILA DO KLIENTA (SKLEP)
        try {
            await resend.emails.send({
                from: 'Banda Frytki <sklep@bandafrytki.pl>',
                to: [data.email],
                cc: ['bandafrytki@gmail.com'],
                subject: `Zamówienie #${savedOrder._id.toString().slice(-6)} przyjęte! 🍟`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
                        <h1 style="color: #FFCC00; text-align: center;">BANDA FRYTKI 🍟</h1>
                        <h2 style="color: #333;">Siemano ${data.name}!</h2>
                        <p>Dzięki za zamówienie! Twoja kosa (koszulka) już się szykuje.</p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                            <p><strong>PRODUKT:</strong> BANDA FRYTKI TEE</p>
                            <p><strong>ROZMIAR:</strong> ${data.size}</p>
                            <p><strong>SUMA:</strong> ${data.totalPrice} PLN</p>
                        </div>
                        <p><strong>DOSTAWA:</strong></p>
                        <p>${data.deliveryMethod === 'inpost' ? `Paczkomat: ${data.selectedPoint}` : `Adres: ${data.address}`}</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p style="font-size: 12px; color: #777; text-align: center;">
                            Numer Twojego zamówienia: ${savedOrder._id}<br>
                            Banda Frytki - Pozdro!
                        </p>
                    </div>
                `
            });
            console.log("✅ Mail sklepowy wysłany do:", data.email);
        } catch (mailError) {
            console.error("❌ Błąd wysyłki maila sklepowego:", mailError.message);
        }

        res.status(201).json({ success: true, orderId: savedOrder._id });
    } catch (err) {
        console.error("❌ BŁĄD SKLEPU:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 2. ENDPOINT DLA REZERWACJI (STARY)
// ==========================================
app.post("/book", async (req, res) => {
    try {
        const { name, email, date, time } = req.body;
        // Tutaj logika rezerwacji (Booking.create itd.)

        try {
            await resend.emails.send({
                from: 'Banda Frytki <sklep@bandafrytki.pl>',
                to: [email],
                subject: "Potwierdzenie rezerwacji ✅",
                html: `<p>Siemano ${name}, termin ${date} o ${time} zaklepany!</p>`
            });
        } catch (e) {
            console.error("Błąd maila rezerwacji");
        }

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// START SERWERA
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Serwer śmiga na porcie ${PORT}`);
});