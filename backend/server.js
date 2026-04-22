require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================
// MIDDLEWARE (WAŻNE DLA HOTPAY)
// ==========================================
app.use(cors());
app.use(express.json());
// Dodajemy obsługę x-www-form-urlencoded, bo tak dane wysyła HotPay
app.use(express.urlencoded({ extended: true }));

// Połączenie z bazą
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Połączono z MongoDB Atlas!'))
    .catch(err => console.error('❌ Błąd połączenia:', err));

// ==========================================
// 1. ENDPOINT DLA ZAMÓWIEŃ (Zapis do bazy bez maila)
// ==========================================
app.post('/api/orders', async (req, res) => {
    console.log("Odebrane dane:", req.body);
    try {
        const data = req.body.orderData || req.body;
console.log("Saving order for email:", data.email);
        const newOrder = new Order({
            orderId: data.orderId,
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
            totalPrice: data.totalPrice,
            status: 'pending' // Domyślny status przed zapłatą
        });

        const savedOrder = await newOrder.save();

        // Nie wysyłamy tutaj maila! 
        // Tylko potwierdzamy Reactowi, że zamówienie "czeka" w bazie.
        res.status(201).json({ success: true, orderId: savedOrder._id });
    } catch (err) {
        console.error("❌ BŁĄD SKLEPU:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// 2. NOTYFIKACJA Z HOTPAY (TUTAJ WYSYŁAMY MAIL PO ZAPŁACIE)
// ==========================================
app.post('/api/hotpay-notification', async (req, res) => {
    try {
        const data = req.body;
        console.log("📩 Otrzymano notyfikację z HotPay:", data);

        // HotPay wysyła STATUS "SUCCESS" gdy pieniądze wpłynęły
        if (data.STATUS === 'SUCCESS') {
            // Szukamy zamówienia w bazie po mailu (najświeższe nieopłacone)
           const order = await Order.findOne({ orderId: data.ID_ZAMOWIENIA });
           if (order) {
        console.log("Znaleziono zamówienie w bazie dla ID:", data.ID_ZAMOWIENIA);
        console.log("Email przypisany do zamówienia:", order.email); // To sprawdzi czy e-mail istnieje w bazie

            if (order && order.status !== 'paid') {
                // WYSYŁKA MAILA PRZEZ RESEND (Dopiero teraz!)
                try {
                    await resend.emails.send({
                        from: 'Banda Frytki <sklep@bandafrytki.pl>',
                        to: [order.email],
                        cc: ['bandafrytki@gmail.com'],
                        subject: `Twoje zamówienie opłacone! 🍟`,
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
                                <h1 style="color: #FFCC00; text-align: center;">BANDA FRYTKI 🍟</h1>
                                <h2 style="color: #333;">Siemano ${order.name}!</h2>
                                <p>Płatność zatwierdzona! Twoja kosa (koszulka) już się szykuje do wysyłki.</p>
                                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                                    <p><strong>PRODUKT:</strong> BANDA FRYTKI TEE</p>
                                    <p><strong>ROZMIAR:</strong> ${order.size}</p>
                                    <p><strong>SUMA:</strong> ${order.totalPrice} PLN (OPŁACONO)</p>
                                </div>
                                <p><strong>DOSTAWA:</strong></p>
                                <p>${order.deliveryMethod === 'inpost' ? `Paczkomat: ${order.address}` : `Adres: ${order.address}`}</p>
                                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                                <p style="font-size: 12px; color: #777; text-align: center;">
                                    Numer Twojego zamówienia: ${order._id}<br>
                                    Wkrótce dostaniesz info o wysyłce!<br>
                                    Banda Frytki - Pozdro!
                                </p>
                            </div>
                        `
                    });
                    console.log("✅ Mail po płatności wysłany do:", order.email);

                    // Zmieniamy status w bazie na opłacone
                    order.status = 'paid';
                    await order.save();
                } catch (mailError) {
                    console.error("❌ Błąd wysyłki maila po płatności:", mailError.message);
                }
            }
        }
    }
        // Zawsze odpowiadaj HotPay "YES", żeby potwierdzić odebranie notyfikacji
        res.status(200).send('YES');
    } catch (err) {
        console.error("❌ BŁĄD NOTYFIKACJI:", err.message);
        res.status(500).send('ERROR');
    }
    
});

// ==========================================
// 3. ENDPOINT DLA REZERWACJI (STARY - BEZ ZMIAN)
// ==========================================
app.post("/book", async (req, res) => {
    try {
        const { name, email, date, time } = req.body;
        // Tutaj logika Twojej rezerwacji...

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

// ==========================================
// START SERWERA
// ==========================================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Serwer śmiga na porcie ${PORT}`);
});