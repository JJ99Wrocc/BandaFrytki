import React, { useState } from "react";
import '../css/TermsAndConditions.css';

const PrivacyPolicyAndCookies = ({ onBack }) => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const sections = 
   [
    {
        id: 1,
        title: "§1. Administrator Danych Osobowych",
        content: "Administratorem danych osobowych jest Joachim Esangbedo prowadzący działalność gospodarczą pod adresem: ul. Nowodworska 39/6, 54-433 Wrocław, NIP: 8943268275. Dane przetwarzane są zgodnie z rozporządzeniem RODO (UE 2016/679)."
    },
    {
        id: 2,
        title: "§2. Cel i Podstawa Przetwarzania",
        content: "Dane (imię, nazwisko, adres, e-mail, telefon) przetwarzane są w celu: 1. Realizacji umowy sprzedaży (Art. 6 ust. 1 lit. b RODO). 2. Wypełnienia obowiązków prawnych, np. wystawienia faktury (Art. 6 ust. 1 lit. c RODO). 3. Ewentualnego dochodzenia roszczeń (prawnie uzasadniony interes Administratora). Podanie danych jest dobrowolne, ale niezbędne do sfinalizowania zakupu."
    },
    {
        id: 3,
        title: "§3. Okres Przechowywania Danych",
        content: "Dane będą przechowywane przez okres niezbędny do realizacji zamówienia, a po tym czasie przez okres wymagany przepisami prawa podatkowego (5 lat od końca roku kalendarzowego) lub do czasu przedawnienia ewentualnych roszczeń."
    },
    {
        id: 4,
        title: "§4. Odbiorcy Danych i Płatności",
        content: "Dane są przekazywane podmiotom wspierającym realizację zamówienia: firmom kurierskim (InPost, DPD) oraz podmiotom obsługującym płatności elektroniczne. W przypadku wyboru płatności online, Twoje dane niezbędne do realizacji transakcji są przekazywane operatorowi płatności HotPay (e-Service Sp. z o.o. / mElements S.A.)."
    },
    {
        id: 5,
        title: "§5. Prawa Użytkownika",
        content: "Przysługuje Ci prawo do dostępu, sprostowania, usunięcia, ograniczenia przetwarzania oraz przenoszenia danych. Masz także prawo do sprzeciwu wobec przetwarzania. Kontakt w sprawach RODO: bandafrytki@gmail.com. Skarga może zostać wniesiona do Prezesa Urzędu Ochrony Danych Osobowych (PUODO)."
    },
    {
        id: 6,
        title: "§6. Pliki Cookies",
        content: "Sklep wykorzystuje technologię cookies w celu zapewnienia funkcjonalności (koszyk, logowanie) oraz w celach analitycznych. Możesz zarządzać cookies w ustawieniach przeglądarki. Korzystanie z witryny bez zmiany ustawień oznacza zgodę na ich zapisywanie."
    }
]

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