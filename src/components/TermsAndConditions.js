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
        content: "Sklep internetowy bandafrytki.pl prowadzony jest przez Joachima Esangbedo, ul. Nowodworska 39/6, 54-433 Wrocław, NIP: 8943268275. Sprzedaż odbywa się w ramach działalności nierejestrowanej (art. 5 ustawy Prawo przedsiębiorców). Regulamin określa zasady korzystania ze Sklepu, składania zamówień oraz procedury reklamacyjne."
    },
    {
        id: 2,
        title: "§2. Zawarcie Umowy i Płatności",
        content: "Wszystkie ceny są cenami brutto w PLN. Umowa sprzedaży zostaje zawarta z chwilą opłacenia zamówienia przez Klienta. Płatności procesowane są przez operatora HotPay (e-Service Sp. z o.o. / mElements S.A.). Dostępne metody to: BLIK, karty płatnicze oraz szybkie przelewy online. Realizacja zamówienia następuje po pozytywnej autoryzacji płatności."
    },
    {
        id: 3,
        title: "§3. Dostawa i Koszty",
        content: "Dostawa realizowana jest na terenie Polski przez InPost (Paczkomaty/Kurier) oraz DPD. Czas realizacji zamówienia wynosi od 2 do 5 dni roboczych. Koszt dostawy jest widoczny w koszyku i pokrywany przez Kupującego, chyba że opis oferty stanowi inaczej."
    },
    {
        id: 4,
        title: "§4. Prawo do Odstąpienia od Umowy (Ochrona Sprzedawcy)",
        content: "Konsument może odstąpić od umowy w ciągu 14 dni. Konsument ponosi bezpośrednie koszty zwrotu towaru. Towar musi być zwrócony w stanie niezmienionym. Zgodnie z prawem, Konsument odpowiada za zmniejszenie wartości towaru wynikające z korzystania z niego w sposób wykraczający poza konieczny do stwierdzenia jego charakteru (np. ślady prania, zapach, zabrudzenia). W takim przypadku Sprzedawca ma prawo do potrącenia kwoty odpowiadającej spadkowi wartości towaru."
    },
    {
        id: 5,
        title: "§5. Wyłączenia z Prawa Zwrotu",
        content: "Prawo do odstąpienia od umowy nie przysługuje w przypadku produktów personalizowanych, wykonanych na indywidualne zamówienie Klienta (np. nadruk na życzenie) oraz towarów dostarczanych w zapieczętowanym opakowaniu, których po otwarciu nie można zwrócić ze względu na ochronę zdrowia lub higienę."
    },
    {
        id: 6,
        title: "§6. Reklamacje (Rękojmia)",
        content: "Sprzedawca odpowiada za wady towaru na zasadach rękojmi. Reklamacje należy zgłaszać na: joachimek1@interia.pl. Sprzedawca rozpatrzy reklamację w ciągu 14 dni. Reklamacja nie obejmuje uszkodzeń mechanicznych powstałych z winy Kupującego lub w wyniku nieprawidłowej konserwacji (np. pranie w zbyt wysokiej temperaturze)."
    },
    {
        id: 7,
        title: "§7. Postanowienia Końcowe",
        content: "Administrator przetwarza dane zgodnie z Polityką Prywatności. W sprawach nieuregulowanych stosuje się przepisy Kodeksu Cywilnego oraz Ustawy o prawach konsumenta. Spory mogą być rozstrzygane polubownie lub przez właściwy sąd powszechny."
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