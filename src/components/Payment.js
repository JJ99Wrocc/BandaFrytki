import React, { useState } from "react";
import '../css/Payment.css';
import HotPayLogo from '../photo/hotpay-logo.webp'; 

const Payment = ({ shake, setShake, onBack }) => {
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
        
        console.log(`Inicjowanie płatności dla: ${paymentMethod}`);
        alert(`PRZEKIEROWANIE DO BRAMKI: ${paymentMethod.toUpperCase()}`);
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
                    ZAPŁAĆ TERAZ
                </button>
            </div>
        </section>
    );
};

export default Payment;