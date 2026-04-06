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
            title: "1. Szybkie Zwroty (14 dni)",
            content: "Masz prawo zwrócić towar bez podania przyczyny w ciągu 14 dni od otrzymania paczki. Pamiętaj jednak, że produkt musi być w stanie nienaruszonym – nie może nosić śladów użytkowania ani prania. Koszt wysyłki zwrotnej pokrywa Kupujący. Nie przyjmujemy paczek pobraniowych."
        },
        {
            id: 2,
            title: "2. Jak dokonać zwrotu? (Krok po kroku)",
            content: "1. Napisz do nas na info@bandafrytki.pl z numerem zamówienia. 2. Wydrukuj i wypełnij formularz odstąpienia (wyślemy Ci go w mailu). 3. Spakuj bezpiecznie towar. 4. Nadaj paczkę dowolnym kurierem na nasz adres (pamiętaj o zachowaniu potwierdzenia nadania!)."
        },
        {
            id: 3,
            title: "3. Zwrot środków",
            content: "Pieniądze zwracamy niezwłocznie, nie później niż w ciągu 14 dni od momentu, gdy paczka do nas dotrze i przejdzie pozytywną weryfikację stanu towaru. Zwrot otrzymasz tą samą drogą, którą opłacono zamówienie (BLIK, karta, przelew)."
        },
        {
            id: 4,
            title: "4. Reklamacje (Wady towaru)",
            content: "Jeśli towar dotarł uszkodzony lub ma wadę fabryczną – naprawimy to! Reklamację zgłoś mailowo, załączając zdjęcia wady. Odpowiemy w ciągu 14 dni. Pamiętaj, że reklamacja nie obejmuje uszkodzeń mechanicznych powstałych z winy użytkownika (np. rozerwanie podczas złego użytkowania)."
        },
        {
            id: 5,
            title: "5. Wyłączenia ze zwrotów",
            content: "Zgodnie z prawem, zwrotowi nie podlegają produkty personalizowane (robione na Twoje specjalne zamówienie) oraz produkty, które ze względów higienicznych zostały otwarte (jeśli dotyczy). Dbamy o najwyższą jakość, więc każdy produkt przed wysyłką przechodzi kontrolę."
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