import React, { useState } from "react";
import '../css/TermsAndConditions.css';

const ReturnsAndComplaints = ({ onBack }) => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const sections = [
 
    {
        id: 1,
        title: "1. Prawo do odstąpienia od umowy",
        content: "Konsument (lub osoba fizyczna prowadząca działalność gospodarczą na prawach Konsumenta) ma prawo odstąpić od umowy w terminie 14 dni bez podania przyczyny. Bieg terminu rozpoczyna się od dnia dostarczenia produktu. Do zachowania terminu wystarczy wysłanie oświadczenia przed jego upływem na adres: bandafrytki@gmail.com."
    },
    {
        id: 2,
        title: "2. Procedura i Koszty Zwrotu",
        content: "1. Poinformuj nas mailowo o chęci zwrotu. 2. Odeślij towar na adres: ul. Nowodworska 39/6, 54-433 Wrocław. Bezpośredni koszt zwrotu towaru (wysyłkę) pokrywa Konsument. Nie przyjmujemy przesyłek wysłanych 'za pobraniem'. Towar powinien być zabezpieczony tak, aby nie uległ uszkodzeniu w transporcie."
    },
    {
        id: 3,
        title: "3. Odpowiedzialność za towar i Potrącenia",
        content: "Konsument ponosi odpowiedzialność za zmniejszenie wartości towaru wynikające z korzystania z niego w sposób wykraczający poza konieczny do stwierdzenia charakteru i cech produktu. W przypadku zwrotu towaru ze śladami użytkowania (np. zapach perfum, potu, prania, makijażu, usunięte metki), Sprzedawca dokona potrącenia kwoty zwrotu proporcjonalnie do utraty wartości towaru, zgodnie z obowiązującymi przepisami Kodeksu Cywilnego."
    },
    {
        id: 4,
        title: "4. Zwrot płatności przez HotPay",
        content: "Zwrotu środków dokonamy w ciągu 14 dni od otrzymania oświadczenia, jednak zastrzegamy prawo do wstrzymania się ze zwrotem do czasu fizycznego otrzymania i zweryfikowania stanu towaru. Zwrot następuje przy użyciu identycznej metody płatności (np. zwrot na ten sam numer BLIK lub kartę przez system HotPay), co eliminuje ryzyko błędów i zapewnia bezpieczeństwo obu stron."
    },
    {
        id: 5,
        title: "5. Reklamacje i Wyłączenia",
        content: "Zgodnie z prawem, zwrotowi nie podlegają produkty personalizowane (wykonane na indywidualne zamówienie) oraz towary higieniczne po otwarciu opakowania. Reklamacje z tytułu rękojmi za wady (produkty uszkodzone/niezgodne z opisem) należy zgłaszać mailowo. Reklamacja nie obejmuje uszkodzeń mechanicznych spowodowanych przez użytkownika."
    }

    ];

    return (
        <section className="legal-section" id="returns">
            <div className="legal-container">
                <button className="pro-back-link" onClick={onBack} type="button">
                    <span className="arrow-icon">←</span>
                    <span className="text-wrapper">
                        <span className="label">POWRÓT</span>
                        <span className="sub-label">DO SKLEPU</span>
                    </span>
                </button>

                <header className="legal-header">
                    <span className="legal-tag">POLITYKA ZWROTÓW</span>
                    <h1>Zwroty i <span>Reklamacje</span></h1>
                    <p className="legal-sub">Coś nie gra? Spokojnie, ogarniemy to profesjonalnie.</p>
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
                    <p><strong>Pamiętaj:</strong> Szanujmy swój czas. Jeśli masz wątpliwości co do rozmiaru przed zakupem – napisz do nas na Instagramie, doradzimy!</p>
                </div>

                <div className="legal-footer">
                    <p>Banda Frytki | Procedura zwrotów v2.0</p>
                </div>
            </div>
        </section>
    );
};

export default ReturnsAndComplaints;