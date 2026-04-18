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
        title: "1. Bezpieczne Metody Płatności",
        content: "Podmiotem świadczącym obsługę płatności online jest HotPay. Za zamówienie zapłacisz bezpiecznie poprzez: BLIK, szybkie przelewy online, karty płatnicze oraz Google Pay i Apple Pay. Transakcje procesowane są przez autoryzowanego operatora (e-Service / mElements), co gwarantuje najwyższy standard bezpieczeństwa PCI DSS oraz szyfrowanie SSL."
    },
    {
        id: 2,
        title: "2. Realizacja Zamówienia",
        content: "Proces realizacji rozpoczynamy niezwłocznie po pozytywnej autoryzacji płatności. Produkty wysyłamy w ciągu 24-48h. W przypadku produktów personalizowanych (na zamówienie), czas realizacji jest określony w opisie produktu. Zastrzegamy sobie prawo do kontaktu w celu weryfikacji danych przy zamówieniach budzących wątpliwości."
    },
    {
        id: 3,
        title: "3. Dostawa i Odbiór Przesyłki",
        content: "Dostawy realizujemy przez Paczkomaty InPost (11,49 zł) oraz Kuriera (14,49 zł). Kupujący ma obowiązek sprawdzić stan przesyłki przy odbiorze. W przypadku stwierdzenia uszkodzenia opakowania lub ingerencji osób trzecich, należy sporządzić protokół szkody w obecności kuriera/przy paczkomacie. Jest to podstawa do dochodzenia roszczeń za uszkodzenia mechaniczne powstałe w transporcie."
    },
    {
        id: 4,
        title: "4. Zwroty (Odstąpienie od umowy)",
        content: "Konsument ma 14 dni na zwrot. Pieniądze zwracamy niezwłocznie po otrzymaniu i sprawdzeniu stanu towaru. Zgodnie z prawem, odpowiadasz za zmniejszenie wartości towaru wynikające z niewłaściwego użytkowania (np. plamy, zapach, brak metek). W przypadku zwrotu produktu używanego lub niekompletnego, kwota zwrotu zostanie pomniejszona o stopień zużycia towaru."
    },
    {
        id: 5,
        title: "5. Procedura Reklamacji i Zwrotu Środków",
        content: "Reklamacje z tytułu rękojmi rozpatrujemy w 14 dni. Reklamacja nie obejmuje uszkodzeń powstałych z winy użytkownika. Zwrot środków realizowany jest zawsze przy użyciu tego samego sposobu płatności, jakiego użył Kupujący (np. zwrot na ten sam numer BLIK/kartę za pośrednictwem systemu HotPay), co zapewnia pełną przejrzystość i bezpieczeństwo transakcji."
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