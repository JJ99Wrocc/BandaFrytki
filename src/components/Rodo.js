import React, { useState } from "react";
import '../css/TermsAndConditions.css';

const Rodo = ({ onBack }) => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const sections = [

    {
        id: 1,
        title: "1. Kto jest Administratorem Twoich danych?",
        content: "Administratorem Twoich danych osobowych jest Joachim Esangbedo, ul. Nowodworska 39/6, 54-433 Wrocław, NIP: 8943268275. Sprzedaż prowadzona jest w formie działalności nierejestrowanej zgodnie z art. 5 ustawy Prawo przedsiębiorców. Kontakt w sprawach ochrony prywatności: bandafrytki@gmail.com."
    },
    {
        id: 2,
        title: "2. Cel i podstawa przetwarzania danych",
        content: "Twoje dane przetwarzamy zgodnie z RODO w celu: 1. Realizacji umowy sprzedaży (Art. 6 ust. 1 lit. b RODO). 2. Wypełnienia obowiązków prawnych i podatkowych wynikających z prowadzenia sprzedaży (Art. 6 ust. 1 lit. c RODO). 3. Dochodzenia roszczeń lub obrony przed nimi (prawnie uzasadniony interes – Art. 6 ust. 1 lit. f RODO)."
    },
    {
        id: 3,
        title: "3. Odbiorcy danych (Partnerzy)",
        content: "W celu realizacji zamówienia, Twoje dane są przekazywane wyłącznie niezbędnym podmiotom: operatorowi płatności HotPay (w celu procesowania wpłaty), firmom kurierskim (np. InPost) w celu dostawy oraz podmiotom zapewniającym wsparcie księgowe i techniczne dla Sklepu."
    },
    {
        id: 4,
        title: "4. Twoje prawa",
        content: "Przysługuje Ci prawo dostępu do swoich danych, ich sprostowania, usunięcia ('prawo do bycia zapomnianym'), ograniczenia przetwarzania, przenoszenia danych oraz prawo do wniesienia sprzeciwu. Masz również prawo wniesienia skargi do organu nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych (PUODO)."
    },
    {
        id: 5,
        title: "5. Okres przechowywania i bezpieczeństwo",
        content: "Dane przechowywane są przez okres niezbędny do realizacji zamówienia oraz wymagany przez przepisy prawa podatkowego (5 lat od końca roku kalendarzowego, w którym dokonano zakupu). Wszystkie dane są chronione certyfikatem SSL, co zapewnia bezpieczne szyfrowanie połączenia."
    }

    ];

    return (
        <section className="legal-section" id="rodo-section">
            <div className="legal-container">
                <button className="pro-back-link" onClick={onBack} type="button">
                    <span className="arrow-icon">←</span>
                    <span className="text-wrapper">
                        <span className="label">POWRÓT</span>
                        <span className="sub-label">DO SKLEPU</span>
                    </span>
                </button>

                <header className="legal-header">
                    <span className="legal-tag">RODO / GDPR COMPLIANT</span>
                    <h1>Obowiązek <span>Informacyjny</span></h1>
                    <p className="legal-sub">Szanujemy Twoją prywatność. Tutaj dowiesz się, jak chronimy Twoje dane osobowe.</p>
                </header>

                <div className="legal-accordion">
                    {sections.map((section) => (
                        <div 
                            key={section.id} 
                            className={`legal-item ${activeAccordion === section.id ? 'active' : ''}`}
                            onClick={() => toggleAccordion(section.id)}
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
                    <p><strong>Uwaga:</strong> Podanie danych jest dobrowolne, ale jeśli ich nie podasz, nie będziemy mogli wysłać Ci Twojego zamówienia. Proste zasady!</p>
                </div>

                <div className="legal-footer">
                    <p>Ostatnia aktualizacja: Kwiecień 2026 | Banda Frytki</p>
                </div>
            </div>
        </section>
    );
};

export default Rodo;