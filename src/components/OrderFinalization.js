import React, { useState } from "react";
// Dodajemy importy z react-leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import '../css/OrderFinalization.css';
import '../components/InPostMap';
import { useMap } from 'react-leaflet';
// Fix dla brakujących ikon markerów w React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OrderFinalization = ({ selectedSize, shake, setShake, onSuccess, onBack }) => {
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
        
        // Adres walidujemy tylko jeśli to kurier (dla InPostu będziesz miał wybór punktu)
        const isAddressValid = customerData.deliveryMethod === 'courier' 
            ? (customerData.address.length > 12 && /\d{2}-\d{3}/.test(customerData.address)) 
            : true;

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
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    size: selectedSize,
                    ...customerData
                })
            });

            if (response.ok) {
                onSuccess();
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
                        className={`customer-input ${errors.email ? 'error-border' : ''}`}
                        onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                    />
                </div>

                {/* WYBÓR DOSTAWY */}
                <div className="delivery-methods">
                    <div 
                        className={`delivery-tile ${customerData.deliveryMethod === 'inpost' ? 'active' : ''}`}
                        onClick={() => setCustomerData({...customerData, deliveryMethod: 'inpost'})}
                    >
                        <div className="tile-icon">📦</div>
                        <div className="tile-info">
                            <span className="method-name">Paczkomat InPost</span>
                            <span className="method-price">10.99 PLN</span>
                        </div>
                    </div>

                    <div 
                        className={`delivery-tile ${customerData.deliveryMethod === 'courier' ? 'active' : ''}`}
                        onClick={() => setCustomerData({...customerData, deliveryMethod: 'courier'})}
                    >
                        <div className="tile-icon">🚚</div>
                        <div className="tile-info">
                            <span className="method-name">Kurier DPD / DHL</span>
                            <span className="method-price">16.00 PLN</span>
                        </div>
                    </div>
                </div>

                {/* Przycisk Mapy InPost i Kontener Mapy */}
                {customerData.deliveryMethod === 'inpost' && (
                    <div className="input-group">
                        <div className="paczkomat-wrapper">
                            <button 
                                type="button" 
                                className="inpost-btn"
                                onClick={() => setShowMap(!showMap)}
                            >
                                {showMap ? "❌ Zamknij mapę" : "🍟 Wybierz Paczkomat na mapie"}
                            </button>
                        </div>
                        
                        {showMap && (
                            <div className="map-container-wrapper" style={{ height: '400px', marginTop: '15px', borderRadius: '12px', overflow: 'hidden' }}>
                                <MapContainer center={[52.237, 21.017]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[52.237, 21.017]}>
                                        <Popup>
                                            Tu pojawi się wybrany punkt.
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        )}
                        
                        {customerData.selectedPoint && (
                            <div className="selected-point-info">
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
                    <p>Do zapłaty: <span className="price-amount">85 PLN</span></p>
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