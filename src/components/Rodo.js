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
            content: "Administratorem Twoich danych osobowych jest Joachim Esangbedo, zamieszkały we Wrocławiu, ul. Nowodworska 39/6, NIP: 8943268275. Prowadzimy działalność nierejestrowaną zgodnie z polskim prawem. W sprawach danych możesz pisać na: info@bandafrytki.pl."
        },
        {
            id: 2,
            title: "2. Jaki jest cel przetwarzania danych?",
            content: "Twoje dane przetwarzamy wyłącznie w celu: 1. Realizacji Twojego zamówienia (wysyłka, kontakt). 2. Rozliczeń księgowych i podatkowych. 3. Obrony przed ewentualnymi roszczeniami (np. reklamacje). Nie spamujemy i nie sprzedajemy Twoich danych nikomu."
        },
        {
            id: 3,
            title: "3. Komu przekazujemy Twoje dane?",
            content: "Twoje dane trafiają tylko do zaufanych partnerów niezbędnych do obsługi zamówienia: firmy kurierskiej (InPost), operatora płatności (Tpay/HotPay) oraz opcjonalnie do biura rachunkowego. Każdy z tych podmiotów dba o bezpieczeństwo Twoich danych tak samo mocno jak my."
        },
        {
            id: 4,
            title: "4. Twoje prawa (Bardzo ważne!)",
            content: "Zgodnie z RODO masz prawo do: wglądu w swoje dane, ich poprawienia, żądania ich usunięcia ('prawo do bycia zapomnianym'), ograniczenia przetwarzania oraz przeniesienia danych do innego podmiotu. Chcesz coś zmienić? Napisz do nas e-mail."
        },
        {
            id: 5,
            title: "5. Okres przechowywania danych",
            content: "Dane przechowujemy przez okres niezbędny do realizacji zamówienia oraz przez wymagany przepisami prawa okres archiwizacji dokumentacji księgowej (zazwyczaj 5 lat od końca roku podatkowego)."
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
                    <p><strong>Uwaga:</strong> Podanie danych jest dobrowolne, ale jeśli ich nie podasz, nie będziemy mogli wysłać Ci Twoich frytek. Proste zasady!</p>
                </div>

                <div className="legal-footer">
                    <p>Ostatnia aktualizacja: Kwiecień 2026 | Banda Frytki</p>
                </div>
            </div>
        </section>
    );
};

export default Rodo;