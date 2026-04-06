import React, { useState } from "react";
import '../css/TermsAndConditions.css';

const DeliveryAndPayment = ({ onBack }) => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const sections = [
        {
            id: 1,
            title: "1. Metody Płatności",
            content: "W naszym sklepie zapłacisz szybko i bezpiecznie. Obsługujemy: BLIK, szybkie przelewy online, karty płatnicze (Visa/Mastercard) oraz Google Pay i Apple Pay. Płatności procesowane są przez autoryzowanego operatora [WPISZ NP. TPAY / HOTPAY], co gwarantuje najwyższy standard bezpieczeństwa (szyfrowanie SSL)."
        },
        {
            id: 2,
            title: "2. Czas realizacji zamówienia",
            content: "Szanujemy Twój czas. Produkty wysyłamy zazwyczaj w ciągu 24-48h od momentu zaksięgowania wpłaty. W przypadku produktów preorderowych lub personalizowanych, czas ten może się wydłużyć, o czym zawsze informujemy w opisie produktu."
        },
        {
            id: 3,
            title: "3. Opcje Dostawy i Cennik",
            content: "Dostarczamy na terenie całej Polski. Masz do wyboru: 1. Paczkomaty InPost (15,00 zł) - najwygodniejsza opcja, odbierasz kiedy chcesz. 2. Kurier InPost / DPD (20,00 zł) - prosto pod Twoje drzwi. Przy zamówieniach powyżej [WPISZ KWOTĘ, NP. 200 ZŁ] dostawa GRATIS!"
        },
        {
            id: 4,
            title: "4. Śledzenie Przesyłki",
            content: "Po nadaniu paczki otrzymasz od nas wiadomość e-mail z numerem przewozowym. Dzięki temu możesz w każdej chwili sprawdzić, gdzie aktualnie znajduje się Twoja 'Banda Frytki' i kiedy trafi w Twoje ręce."
        },
        {
            id: 5,
            title: "5. Odbiór Przesyłki",
            content: "Prosimy o sprawdzenie stanu paczki przy kurierze lub przy paczkomacie. Jeśli opakowanie jest widocznie uszkodzone, sporządź protokół szkody – to znacznie ułatwi nam proces ewentualnej reklamacji u przewoźnika."
        }
    ];

    return (
        <section className="legal-section" id="delivery">
            <div className="legal-container">
                <button className="pro-back-link" onClick={onBack} type="button">
                    <span className="arrow-icon">←</span>
                    <span className="text-wrapper">
                        <span className="label">POWRÓT</span>
                        <span className="sub-label">DO SKLEPU</span>
                    </span>
                </button>

                <header className="legal-header">
                    <span className="legal-tag">WYSYŁKA & KASA</span>
                    <h1>Dostawa i <span>Płatność</span></h1>
                    <p className="legal-sub">Wszystko, co musisz wiedzieć o tym, jak Twoje zamówienie trafi do bazy.</p>
                </header>

                <div className="legal-accordion">
                    {sections.map((section) => (
                        <div 
                            key={section.id} 
                            className={`legal-item ${activeAccordion === section.id ? 'active' : ''}`}
                            onClick={() => toggleAccordion(section.id)}
                            tabIndex="0"
                            aria-expanded={activeAccordion === section.id}
                        >
                            <div className="legal-q">
                                <h3>{section.title}</h3>
                                <div className="plus-minus"></div>
                            </div>
                            <div className="legal-a">
                                <div className="legal-a-inner">
                                    <p>{section.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="info-box-legal">
                    <p><strong>Info:</strong> Twoje płatności są szyfrowane certyfikatem SSL. Nie przechowujemy danych Twojej karty – wszystko odbywa się na bezpiecznych serwerach operatora.</p>
                </div>

                <div className="legal-footer">
                    <p>Banda Frytki | Logistics & Finance 2026</p>
                </div>
            </div>
        </section>
    );
};

export default DeliveryAndPayment;