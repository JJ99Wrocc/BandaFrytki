import React, { useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import '../css/OrderFinalization.css';
import InPostMap from "../components/InPostMap";

// Fix dla brakujących ikon markerów w React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OrderFinalization = ({ selectedSize, shake, setShake, onSuccess, onBack, price}) => {
    // Dodatkowy stan do obsługi widoczności mapy
    const [showMap, setShowMap] = useState(false);
    
    // 1. Stan dla danych klienta + dostawa
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        deliveryMethod: 'inpost', // domyślna metoda
        selectedPoint: null // Przechowywanie wybranego paczkomatu
    });
    
    const deliveryCost = customerData.deliveryMethod === 'inpost' ? 11.49 : 14.49;
    const totalPrice = (parseFloat(price) + deliveryCost).toFixed(2);
    const [errors, setErrors] = useState({
        size: false,
        name: false,
        email: false,
        address: false,
        phone: false
    });

    // Filtrowanie cyfr w Imieniu
    const handleNameChange = (e) => {
        const val = e.target.value;
        const cleanVal = val.replace(/[0-9]/g, ''); 
        setCustomerData({ ...customerData, name: cleanVal });
    };

    // 2. Funkcja finalizacji zamówienia
    const handleOrderFinalize = async () => {
        const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        const isNameValid = customerData.name.trim().split(/\s+/).length >= 2 && nameRegex.test(customerData.name);
        const isEmailValid = emailRegex.test(customerData.email);
        
        // Walidacja: jeśli InPost, musi być wybrany punkt. Jeśli kurier, adres musi być długi.
        const isAddressValid = customerData.deliveryMethod === 'courier' 
            ? (customerData.address.length > 12 && /\d{2}-\d{3}/.test(customerData.address)) 
            : !!customerData.selectedPoint;

        const newErrors = {
            size: !selectedSize,
            name: !isNameValid,
            email: !isEmailValid,
            address: !isAddressValid,
            phone: customerData.phone.length < 10
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
                setErrors({ size: false, name: false, email: false, address: false, phone: false });
            }, 800);
            return;
        }

        try {
            const response = await fetch('https://bandafrytki.onrender.com/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    size: selectedSize,
                    ...customerData
                })
            });

            if (response.ok) {
                onSuccess(totalPrice, customerData);
                alert("ZAMÓWIENIE PRZYJĘTE. PRZEKIEROWANIE DO PŁATNOŚCI...");
            }
        } catch (err) {
            console.error("Błąd serwera:", err);
            alert("BŁĄD SERWERA. SPRÓBUJ PÓŹNIEJ.");
        }
    };

    return (    
        <section className="order-finalization" id="order-finalization" aria-labelledby="checkout-title">
            <div className={`container ${shake ? 'shake-animation' : ''}`}>
                <button className="pro-back-link" onClick={onBack} type="button">
                    <span className="arrow-icon">←</span>
                    <span className="text-wrapper">
                        <span className="label">POWRÓT</span>
                        <span className="sub-label">DO SKLEPU</span>
                    </span>
                </button>

                <h2 id="checkout-title">Dane do wysyłki</h2>
                
                <p className="summary-info" aria-live="polite">
                    Wybrany rozmiar: <strong aria-label={`Rozmiar ${selectedSize}`}>{selectedSize || "NIE WYBRANO"}</strong>
                </p>

                {/* Imię i Nazwisko */}
                <div className={`input-group ${errors.name ? 'shake-animation' : ''}`}>
                    <label htmlFor="customer-name" className="sr-only">Imię i Nazwisko</label>
                    <input 
                        id="customer-name"
                        type="text" 
                        placeholder="Imię i Nazwisko" 
                        value={customerData.name}
                        className={`customer-input ${errors.name ? 'error-border' : ''}`}
                        onChange={handleNameChange}
                    />
                </div>

                {/* Email */}
                <div className={`input-group ${errors.email ? 'shake-animation' : ''}`}>
                    <label htmlFor="customer-email" className="sr-only">Adres e-mail</label>
                    <input 
                        id="customer-email"
                        type="email" 
                        placeholder="Adres e-mail" 
                        value={customerData.email}
                        className={`customer-input ${errors.email ? 'error-border' : ''}`}
                        onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                    />
                </div>

                {/* WYBÓR DOSTAWY */}
                <div className="delivery-methods">
                    <div 
                        className={`delivery-tile ${customerData.deliveryMethod === 'inpost' ? 'active' : ''}`}
                        onClick={() => setCustomerData({...customerData, deliveryMethod: 'inpost', address: ''})}
                    >
                        <div className="tile-icon">📦</div>
                        <div className="tile-info">
                            <span className="method-name">Paczkomat InPost</span>
                            <span className="method-price">11.49 PLN</span>
                        </div>
                    </div>

                    <div 
                        className={`delivery-tile ${customerData.deliveryMethod === 'courier' ? 'active' : ''}`}
                        onClick={() => setCustomerData({...customerData, deliveryMethod: 'courier', selectedPoint: null})}
                    >
                        <div className="tile-icon">🚚</div>
                        <div className="tile-info">
                            <span className="method-name">Kurier Inpost</span>
                            <span className="method-price">14,49 PLN</span>
                        </div>
                    </div>
                </div>

                {/* Przycisk Mapy InPost i Kontener Mapy */}
                {customerData.deliveryMethod === 'inpost' && (
                    <div className={`input-group ${errors.address ? 'shake-animation' : ''}`}>
                        <div className="paczkomat-wrapper">
                            <button 
                                type="button" 
                                className={`inpost-btn ${errors.address ? 'error-border' : ''}`}
                                onClick={() => setShowMap(!showMap)}
                            >
                                {showMap ? "❌ Zamknij mapę" : "🍟 Wybierz Paczkomat na mapie"}
                            </button>
                        </div>
                        
                        {showMap && (
                            <div className="map-container-wrapper" style={{ height: '400px', marginTop: '15px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #fc0' }}>
                                <InPostMap onSelectPoint={(point) => {
                                    setCustomerData({
                                        ...customerData, 
                                        selectedPoint: point.name,
                                        address: `Paczkomat: ${point.name}, ${point.address}`
                                    });
                                    setShowMap(false); // Zamyka mapę po wyborze
                                }} />
                            </div>
                        )}
                        
                        {customerData.selectedPoint && (
                            <div className="selected-point-info" style={{marginTop: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #fc0'}}>
                                Wybrany punkt: <strong>{customerData.selectedPoint}</strong>
                            </div>
                        )}
                    </div>
                )}

                {/* Pole adresu (pokazuje się dla kuriera) */}
                {customerData.deliveryMethod === 'courier' && (
                    <div className={`input-group ${errors.address ? 'shake-animation' : ''}`}>
                        <input 
                            type="text" 
                            placeholder="Ulica, nr domu, kod pocztowy, miasto" 
                            value={customerData.address}
                            className={`customer-input ${errors.address ? 'error-border' : ''}`}
                            onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
                        />
                    </div>
                )}

                {/* Telefon */}
                <div className={`input-group phone-wrapper ${errors.phone ? 'shake-animation' : ''}`}>
                    <PhoneInput
                        country={'pl'} 
                        value={customerData.phone}
                        onChange={phone => setCustomerData({...customerData, phone})}
                        placeholder="Numer telefonu"
                        inputClass={`customer-input ${errors.phone ? 'error-border' : ''}`}
                        containerClass="phone-container-custom"
                    />
                </div>

                <div className="price-display" role="status">
                    <p className="price-display-p">Produkt: {price} PLN</p>
                    <p className="price-display-p">Dostawa: {deliveryCost} PLN</p>
                    <p className="price-display-p">Do zapłaty: <span className="price-amount">{totalPrice} PLN</span></p>
                </div>

                <button 
                    className="finalize-btn" 
                    type="button" 
                    onClick={handleOrderFinalize}
                >
                    Sfinalizuj Zamówienie
                </button>
            </div>
        </section>
    );
};

export default OrderFinalization;