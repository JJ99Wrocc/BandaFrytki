import React from "react";
import { useState } from 'react';
import '../css/Footer.css'; // Pamiętaj o dodaniu stylów

const Footer = ({navigate}) => {
    // Stan trzymający informację, która sekcja jest otwarta (null = wszystkie zamknięte)
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (sectionName) => {
        // Jeśli klikasz w już otwartą - zamknij. Jeśli w inną - otwórz nową.
        setOpenSection(openSection === sectionName ? null : sectionName);
    };
    return (
        <section className="footer-section" aria-labelledby="footer-navigation">
            <footer className="footer">
                <div className="upper-footer">
                    {/* Nawigacja główna */}
                    <nav 
                    className={`footer-nav-block ${openSection === 'map' ? 'is-open' : ''}`}
                     aria-label="Nawigacja strony"
                    >
                        <h4 className="footer-title"
                        onClick={() => toggleSection('map')}
                     tabIndex="0">Mapa Strony</h4>
                        <ul className="footer-navigation">
                            <li><a href="#header-section">Strona Główna</a></li>
                            <li><a href="#product-section">Produkt</a></li>
                            <li><a href="#links-section">Linki</a></li>
                            <li><a href="#videos-section">Filmy</a></li>
                        </ul>
                    </nav>

                    {/* Informacje prawne - KLUCZOWE DLA BRAMKI PŁATNOŚCI */}
                    <nav className={`footer-nav-block ${openSection === 'info' ? 'is-open' : ''}`} 
                         aria-label="Informacje prawne" 
                        >
                        <h4 className="footer-title"
                        onClick={() => toggleSection('info')}   
                         tabIndex="0">Informacje</h4>
                        <ul className="important-info">
                            <li><a href="/TermsAndConditions" onClick={(e) => navigate('terms', e)} target="_blank" rel="noopener noreferrer">Regulamin Sklepu</a></li>
                            <li><a href="/PrivacyPolicyandCookies" onClick={(e) => navigate('privacy', e)} target="_blank" rel="noopener noreferrer">Polityka Prywatności i Cookies</a></li>
                            <li><a href="/DeliveryAndPayment" onClick={(e) => navigate('delivery', e)} target="_blank" rel="noopener noreferrer">Dostawa i Płatność</a></li>
                            <li><a href="/ReturnsAndComplaints" onClick={(e)=> navigate('returns', e)}>Zwroty i Reklamacje</a></li>
                            <li><a href="/Rodo" onClick={(e)=> navigate('rodo', e)}>RODO</a></li>
                        </ul>
                    </nav>

                    {/* Kontakt */}
                    <div className={`footer-nav-block ${openSection === 'contact' ? 'is-open' : ''}`} 
                        > 
                        <h4 className="footer-title"
                        onClick={() => toggleSection('contact')}
                         tabIndex="0"
                        >Kontakt</h4>
                        <ul className="contact-list">
                            <li>
                                <a href="tel:+48123456789" aria-label="Zadzwoń do nas">
                                    Telefon: 123 456 789
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@bandafrytki.pl" aria-label="Wyślij e-mail">
                                    Email: info@bandafrytki.pl
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Sekcja Metod Płatności - WYMAGANA PRZEZ OPERATORÓW */}
                <div className="payment-methods-wrapper" aria-label="Akceptowane metody płatności">
                    <p className="payment-text">Bezpieczne płatności obsługiwane przez operatora:</p>
                    <div className="payment-icons">
                        {/* Możesz użyć ikon SVG lub obrazków PNG z folderu assets */}
                        <img src="https://tpay.com/img/logos/tpay.svg" alt="Tpay" className="payment-logo" />
                        <img src="https://static.hotpay.pl/img/logo/logo_blik.png" alt="BLIK" className="payment-logo" />
                       <img src="https://static.tpay.com/img/logos/visa.svg" alt="Visa" className="payment-logo" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="payment-logo" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="payment-logo" />
                    </div>
                </div>

                <hr className="footer-divider" />

                {/* Oficjalne dane sprzedawcy - BEZ TEGO ODRZUCĄ WNIOSEK */}
                <div className="lower-footer">
                
                    <div className="copyright">
                        <p>© {new Date().getFullYear()} Banda Frytki. Wszelkie prawa zastrzeżone.</p>
                        <p className="creator">Designed & Coded by JJ</p>
                    </div>
                </div>
            </footer>
        </section>
    );
}

export default Footer;