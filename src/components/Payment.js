import React, { useState } from "react";
import '../css/Payment.css';
import HotPayLogo from '../photo/hotpay-logo.webp'; 

const Payment = ({ shake, setShake, onBack, totalPrice, customerData, selectedSize }) => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [error, setError] = useState(false);

    const methods = [
        { id: 'transfer', name: 'HotPay'}
    ];
    
    const handlePaymentFinalize = async () => {
        if (!paymentMethod) {
            setError(true);
            setShake(true);
            setTimeout(() => { setShake(false); setError(false); }, 800);
            return;
        }
        const ID_ZAMOWIENIA = `ORDER-${Date.now()}`;
    try {
 const orderData = {
            orderId: ID_ZAMOWIENIA,
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            deliveryMethod: customerData.deliveryMethod,
            selectedPoint: customerData.selectedPoint,
            size: selectedSize,
            totalPrice: totalPrice,
        };

const response = await fetch(`https://bandafrytki.onrender.com/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({orderData}) // DODAJEMY orderId
});
        const result = await response.json();

        if (!result.success) {
            throw new Error("Błąd zapisu zamówienia w bazie");
        }

    // 1. Sekret - upewnij się, że nie ma tam spacji na początku/końcu
    const SEKRET = 'd0I4THRRTEg5dVkxQW9xQW55bDJpOVgrM2pEdXF1STNKb09McTNpZEV0bz0,';
    
    // 2. Kwota - dodaj sprawdzenie czy totalPrice istnieje
    const cena = parseFloat(totalPrice);
    if (isNaN(cena) || cena <= 0) {
        alert("Błąd kwoty zamówienia!");
        return;
    }
    const KWOTA = cena.toFixed(2);
        const NAZWA_USLUGI = 'Zamówienie Banda Frytki';

    // 3. Budowanie URL za pomocą URLSearchParams (bezpieczniejsze niż string template)
    const params = new URLSearchParams({
        SEKRET: SEKRET,
        KWOTA: KWOTA,
        NAZWA_USLUGI: NAZWA_USLUGI,
        ID_ZAMOWIENIA: ID_ZAMOWIENIA,
        ADRES_WWW: window.location.origin,
        ADRES_SUCCESS: `${window.location.origin}/?status=success&oid=${ID_ZAMOWIENIA}`,
        ADRES_FAILURE: `${window.location.origin}/?status=error`,
        EMAIL: customerData.email
    });

    const hotPayUrl = `https://platnosc.hotpay.pl/?${params.toString()}`;

    console.log("Finalny URL:", hotPayUrl);
    window.location.href = hotPayUrl;
    } catch (error) {
        // TUTAJ domykamy try i obsługujemy błąd
        console.error("Błąd podczas finalizacji płatności:", error);
        alert("Wystąpił błąd podczas zapisywania zamówienia. Spróbuj ponownie.");
    }
};
    return (
        <section className="payment-section" id="payment">
            <div className={`container ${shake ? 'shake-animation' : ''}`}>

                <button className="pro-back-link" onClick={onBack} type="button">
                    <span className="arrow-icon">←</span>
                    <span className="text-wrapper">
                        <span className="label">POWRÓT</span>
                        <span className="sub-label">DANE WYSYŁKI</span>
                    </span>
                </button>
                
                <h2 id="payment-title">Metoda Płatności</h2>
                
                <p className="summary-info">WYBIERZ SPOSÓB ZAPŁATY</p>

                <div className="payment-grid">
                    {methods.map((method) => (
                        <div 
                            key={method.id}
                            className={`payment-card ${paymentMethod === method.id ? 'active' : ''} ${error && !paymentMethod ? 'error-card' : ''}`}
                            onClick={() => setPaymentMethod(method.id)}
                        >
                            <img className="method-icon" src={HotPayLogo}></img>
                            <span className="method-name">{method.name}</span>
                            {paymentMethod === method.id && <div className="selected-check">✓</div>}
                        </div>
                    ))}
                </div>

                <div className="security-info">
                    <p>🔒 Szyfrowane połączenie SSL | Bezpieczne płatności</p>
                </div>

                <button 
                    className="finalize-btn payment-btn" 
                    type="button" 
                    onClick={handlePaymentFinalize}
                >
                    ZAPŁAĆ TERAZ ({totalPrice} PLN)
                </button>
            </div>
        </section>
    );
};

export default Payment;