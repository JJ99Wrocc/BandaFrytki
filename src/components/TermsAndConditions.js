import React, { useState } from "react";
import '../css/TermsAndConditions.css';

const TermsAndConditions = ({onBack}) => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const sections = [
        {
            id: 1,
            title: "§1. Postanowienia Ogólne",
            content: "Sklep internetowy dostępny pod adresem bandafrytki.pl prowadzony jest przez Joachim Esangbedo, zamieszkałego w Wrocław Nowodworska 39/6, NIP: 8943268275. Sprzedaż odbywa się w ramach działalności nierejestrowanej zgodnie z art. 5 ustawy Prawo przedsiębiorców. Kontakt ze sprzedawcą możliwy jest pod adresem: info@bandafrytki.pl."
        },
        {
            id: 2,
            title: "§2. Składanie Zamówień i Płatności",
            content: "Ceny wszystkich produktów są cenami brutto w PLN. Klient może dokonać płatności za pośrednictwem systemów płatności online (BLIK, karta płatnicza, szybki przelew). Operatorem płatności jest [NP. TPAY / HOTPAY]. Realizacja zamówienia rozpoczyna się po otrzymaniu potwierdzenia od operatora płatności."
        },
        {
            id: 3,
            title: "§3. Dostawa i Realizacja",
            content: "Zamówienia realizowane są na terenie Polski za pośrednictwem Paczkomatów InPost oraz kurierów. Czas dostawy wynosi zazwyczaj od 2 do 5 dni roboczych. Koszt dostawy jest wskazywany w procesie składania zamówienia w koszyku."
        },
        {
            id: 4,
            title: "§4. Prawo do Odstąpienia od Umowy",
            content: "Konsument ma prawo odstąpić od umowy bez podania przyczyny w terminie 14 dni od dnia otrzymania towaru. Aby skorzystać z tego prawa, należy wysłać oświadczenie na adres e-mail: info@bandafrytki.pl. Towar musi zostać zwrócony w stanie niezmienionym (nieużywany)."
        },
        {
            id: 5,
            title: "§5. Reklamacje i Gwarancja",
            content: "Sprzedawca odpowiada za wady fizyczne lub prawne towaru. Reklamacje należy zgłaszać drogą elektroniczną. Sprzedawca rozpatrzy reklamację w terminie 14 dni od jej otrzymania. W przypadku uznania reklamacji, towar zostanie naprawiony, wymieniony lub nastąpi zwrot środków."
        },
        {
            id: 6,
            title: "§6. Ochrona Danych Osobowych (RODO)",
            content: "Administratorem danych osobowych jest Sprzedawca. Dane przetwarzane są wyłącznie w celu realizacji zamówienia oraz obsługi ewentualnych reklamacji. Szczegóły dotyczące przetwarzania danych znajdują się w naszej Polityce Prywatności."
        }
    ];

    return (
        <section className="legal-section" id="TermsAndConditions">
            <div className="legal-container">
                  <button className="pro-back-link" onClick={onBack} type="button">
        <span className="arrow-icon">←</span>
        <span className="text-wrapper">
            <span className="label">POWRÓT</span>
            <span className="sub-label">DO SKLEPU</span> {/* Zmienione z 'DANE WYSYŁKI' */}
        </span>
    </button>
                <header className="legal-header">
                    <span className="legal-tag">DOKUMENT OFICJALNY</span>
                    <h1>Regulamin <span>Sklepu</span></h1>
                    <p className="legal-sub">Przejrzyste zasady to podstawa dobrej zabawy. Przeczytaj zanim zamówisz!</p>
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

export default TermsAndConditions;