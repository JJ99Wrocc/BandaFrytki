import React, { useState } from "react";
import '../css/Payment.css';
import HotPayLogo from '../photo/hotpay-logo.webp'; 

const Payment = ({ shake, setShake, onBack, totalPrice }) => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [error, setError] = useState(false);

    const methods = [
        { id: 'transfer', name: 'HotPay'}
    ];

    const handlePaymentFinalize = () => {
    if (!paymentMethod) {
        setError(true);
        setShake(true);
        setTimeout(() => {
            setShake(false);
            setError(false);
        }, 800);
        return;
    }

    const SEKR_USLUGI = 'd0I4THRRTEg5dVkxQW9xQW55bDJpOVgrM2pEdXF1STNKb09McTNpZEV0bz0,';
    
    // Wymuszamy format 0.00, żeby HotPay nie odrzucił płatności
    const kwota = parseFloat(totalPrice).toFixed(2);
    
    const nazwaUslugi = 'Zamówienie Banda Frytki';
    const idZamowienia = `ORDER-${Date.now()}`;

    // KLUCZOWA ZMIANA: dodane /paczka/ przed uzupelnij-dane
    const hotPayUrl = `https://hotpay.pl/paczka/uzupelnij-dane?secret=${SEKR_USLUGI}&amount=${kwota}&desc=${encodeURIComponent(nazwaUslugi)}&order_id=${idZamowienia}`;

    console.log(`Inicjowanie płatności dla: ${paymentMethod}`);
    // Opcjonalnie: możesz usunąć alert przed samym pushem, żeby było profesjonalnie
    window.location.href = hotPayUrl;
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