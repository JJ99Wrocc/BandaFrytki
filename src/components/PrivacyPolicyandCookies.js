import React, { useState } from "react";
import '../css/TermsAndConditions.css';

const PrivacyPolicyAndCookies = ({ onBack }) => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const sections = [
        {
            id: 1,
            title: "§1. Administrator Danych Osobowych",
            content: "Administratorem danych osobowych zbieranych za pośrednictwem Sklepu jest Joachim Esangbedo, Wrocław Nowodworska 39/6, NIP: 8943268275. Dane są przetwarzane zgodnie z rozporządzeniem RODO oraz ustawą o ochronie danych osobowych."
        },
        {
            id: 2,
            title: "§2. Cel i Zakres Zbierania Danych",
            content: "Twoje dane (imię, nazwisko, adres, e-mail, telefon) przetwarzane są wyłącznie w celu realizacji zamówienia, wystawienia dowodu sprzedaży oraz obsługi wysyłki i ewentualnych reklamacji. Podanie danych jest dobrowolne, ale niezbędne do realizacji zakupu."
        },
        {
            id: 3,
            title: "§3. Prawa Użytkownika",
            content: "Masz prawo do dostępu do swoich danych, ich sprostowania, usunięcia („prawo do bycia zapomnianym”), ograniczenia przetwarzania oraz prawo do przenoszenia danych. W celu realizacji tych praw skontaktuj się z nami pod adresem: info@bandafrytki.pl."
        },
        {
            id: 4,
            title: "§4. Odbiorcy Danych",
            content: "W celu realizacji umowy dane mogą być udostępniane podmiotom trzecim tylko w zakresie niezbędnym: firmom kurierskim (InPost), operatorom płatności ([UZUPEŁNIJ - np. Tpay]) oraz biurom rachunkowym obsługującym Sprzedawcę."
        },
        {
            id: 5,
            title: "§5. Pliki Cookies",
            content: "Sklep korzysta z plików cookies (ciasteczek), aby zapewnić poprawne działanie koszyka, zapamiętać Twoje preferencje oraz zbierać anonimowe statystyki ruchu. Możesz w każdej chwili zmienić ustawienia dotyczące cookies w swojej przeglądarce internetowej."
        },
        {
            id: 6,
            title: "§6. Kontakt i Organ Nadzorczy",
            content: "W sprawach związanych z ochroną danych osobowych możesz pisać na info@bandafrytki.pl. Przysługuje Ci również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO)."
        }
    ];

    return (
        <section className="legal-section" id="PrivacyPolicy">
            <div className="legal-container">
                <button className="pro-back-link" onClick={onBack} type="button">
                    <span className="arrow-icon">←</span>
                    <span className="text-wrapper">
                        <span className="label">POWRÓT</span>
                        <span className="sub-label">DO SKLEPU</span>
                    </span>
                </button>

                <header className="legal-header">
                    <span className="legal-tag">RODO & COOKIES</span>
                    <h1>Polityka <span>Prywatności</span></h1>
                    <p className="legal-sub">Twoje dane są u nas bezpieczniejsze niż frytki w głębokim oleju.</p>
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

                <div className="legal-footer">
                    <p>Ostatnia aktualizacja: Kwiecień 2026 | Banda Frytki</p>
                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicyAndCookies;