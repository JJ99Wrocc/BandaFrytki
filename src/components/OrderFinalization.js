import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 
import '../css/OrderFinalization.css';

const OrderFinalization = ({ selectedSize, shake, setShake, onSuccess, onBack }) => {
    // 1. Stan dla danych klienta
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        size: false,
        name: false,
        email: false,
        address: false,
        phone: false
    });

    // Funkcja filtrująca cyfry w locie dla pola Name
    const handleNameChange = (e) => {
        
        const val = e.target.value;
        const cleanVal = val.replace(/[0-9]/g, ''); // Usuwa cyfry natychmiast
        setCustomerData({ ...customerData, name: cleanVal });
    };

    // 2. Funkcja finalizacji zamówienia
    const handleOrderFinalize = async () => {
        // REGEXY PRO
        const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        // WALIDACJA LOGICZNA
        const isNameValid = 
            customerData.name.trim().split(/\s+/).length >= 2 && 
            nameRegex.test(customerData.name);

        const isEmailValid = emailRegex.test(customerData.email);

        const isAddressValid = 
            customerData.address.length > 12 && 
            /\d{2}-\d{3}/.test(customerData.address) && 
            /\d+/.test(customerData.address);

        // Obliczanie błędów
        const newErrors = {
            size: !selectedSize,
            name: !isNameValid,
            email: !isEmailValid,
            address: !isAddressValid,
            phone: customerData.phone.length < 10
        };

        setErrors(newErrors);

        // Jeśli błąd - trzęsiemy i przerywamy
        if (Object.values(newErrors).some(error => error)) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
                setErrors({
                    size: false, name: false, email: false, address: false, phone: false 
                });
            }, 800);
            return;
        }


        console.log("Wszystko gra, wysyłam!");

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
            console.error("Błąd połączenia:", err);
            alert("BŁĄD SERWERA. SPRÓBUJ PÓŹNIEJ.");
        }
    };

    return (    
        <section className="order-finalization" id="order-finalization" aria-labelledby="checkout-title">
            <div className={`container ${shake ? 'shake-animation' : '  '}`}>
                  <button className="pro-back-link" onClick={onBack} type="button">
        <span className="arrow-icon">←</span>
        <span className="text-wrapper">
            <span className="label">POWRÓT</span>
            <span className="sub-label">DO SKLEPU</span> {/* Zmienione z 'DANE WYSYŁKI' */}
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
                        value={customerData.name} // Kontrolowany input by blokada cyfr działała
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

                {/* Adres */}
                <div className={`input-group ${errors.address ? 'shake-animation' : ''}`}>
                    <label htmlFor="customer-address" className="sr-only">Adres dostawy</label>
                    <input 
                        id="customer-address"
                        type="text" 
                        placeholder="Ulica, nr domu, kod pocztowy, miasto" 
                        className={`customer-input ${errors.address ? 'error-border' : ''}`}
                        onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
                    />
                </div>

                {/* Telefon */}
                <div className={`input-group phone-wrapper ${errors.phone ? 'shake-animation' : ''}`}>
                    <PhoneInput
                        country={'pl'} 
                        value={customerData.phone}
                        onChange={phone => setCustomerData({...customerData, phone})}
                        placeholder="Numer telefonu"
                        enableSearch={true}
                        searchPlaceholder="Szukaj kraju..."
                        inputClass={`customer-input ${errors.phone ? 'error-border' : ''}`}
                        containerClass="phone-container-custom"
                        buttonClass="country-select-custom"
                        dropdownClass="dropdown-custom"
                        searchClass="search-custom"
                    />
                </div>

                <div className="price-display" role="status">
                    <p>Do zapłaty: <span className="price-amount">85 PLN</span></p>
                </div>

                <button 
                    className="finalize-btn" 
                    type="button" 
                    aria-label="Sfinalizuj zamówienie" 
                    onClick={handleOrderFinalize}
                >
                    Sfinalizuj Zamówienie
                </button>
            </div>
        </section>
    );
};

export default OrderFinalization;