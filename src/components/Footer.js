import React, { useState, useEffect } from 'react';
import '../css/Footer.css';
import HotPayLogo from '../photo/hotpay-logo.webp'; // Zmieniona nazwa zmiennej dla jasności
import Blik from '../photo/blik-logo.webp';

const Footer = ({ navigate }) => {
    const [openSection, setOpenSection] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const toggleSection = (sectionName) => {
        setOpenSection(openSection === sectionName ? null : sectionName);
    };

    useEffect(() => {
        const toggleVisibility = () => {    
            if (window.pageYOffset > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }   
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <section className="footer-section" aria-labelledby="footer-navigation">
            <footer className="footer">
                <div className="upper-footer">
                    
                    {/* Blok: Mapa Strony */}
                    <nav className={`footer-nav-block ${openSection === 'map' ? 'is-open' : ''}`} aria-label="Nawigacja strony">
                        <h4 className="footer-title" onClick={() => toggleSection('map')} tabIndex="0" role="button">
                            Mapa Strony
                        </h4>
                        <ul className="footer-navigation">
                            <li><a href="#header-section">Strona Główna</a></li>
                            <li><a href="#product-section">Produkt</a></li>
                            <li><a href="#links-section">Linki</a></li>
                            <li><a href="#videos-section">Filmy</a></li>
                        </ul>
                    </nav>

                    {/* Blok: Informacje Prawne - KLUCZOWE DLA HOTPAY */}
                    <nav className={`footer-nav-block ${openSection === 'info' ? 'is-open' : ''}`} aria-label="Informacje prawne">
                        <h4 className="footer-title" onClick={() => toggleSection('info')} tabIndex="0" role="button">
                            Informacje
                        </h4>
                        <ul className="important-info">
                            <li><a href="/TermsAndConditions" onClick={(e) => navigate('terms', e)}>Regulamin Sklepu</a></li>
                            <li><a href="/PrivacyPolicyandCookies" onClick={(e) => navigate('privacy', e)}>Polityka Prywatności i Cookies</a></li>
                            <li><a href="/DeliveryAndPayment" onClick={(e) => navigate('delivery', e)}>Dostawa i Płatność</a></li>
                            <li><a href="/ReturnsAndComplaints" onClick={(e) => navigate('returns', e)}>Zwroty i Reklamacje</a></li>
                            <li><a href="/Rodo" onClick={(e) => navigate('rodo', e)}>Obowiązek informacyjny (RODO)</a></li>
                        </ul>
                    </nav>

                    {/* Blok: Kontakt */}
                    <div className={`footer-nav-block ${openSection === 'contact' ? 'is-open' : ''}`}>
                        <h4 className="footer-title" onClick={() => toggleSection('contact')} tabIndex="0" role="button">
                            Kontakt
                        </h4>
                        <ul className="contact-list">
                            <li>
                                <a href="tel:+48791881256" aria-label="Zadzwoń do nas">
                                    Tel: +48 791 881 256
                                </a>
                            </li>
                            <li>
                                <a href="mailto:bandafrytki@gmail.com" aria-label="Wyślij e-mail">
                                    E-mail: bandafrytki@gmail.com
                                </a>
                            </li>
                            <li style={{ fontSize: "11px", marginTop: "10px", opacity: "0.7" }}>
                                Pracujemy: Pn-Pt 09:00 - 17:00
                            </li>
                        </ul>
                    </div>
                </div>

                {/* SEKCJA PŁATNOŚCI - Zoptymalizowana pod audyt HotPay */}
                <div className="payment-methods-wrapper" aria-label="Akceptowane metody płatności">
                    <p className="payment-text">Bezpieczne płatności online obsługuje <strong>HotPay</strong></p>
                    <div className="payment-icons">
                        <a href="https://hotpay.pl" target="_blank" rel="noopener noreferrer">
                            <img 
                                alt="HotPay - Operator Płatności" 
                                className="payment-logo main-operator" 
                                src={HotPayLogo} 
                                style={{ transition: "0.3s" }}
                            />
                        </a>
                        <div className="payment-icon-box"><i className="fa-brands fa-cc-visa" title="Visa"></i></div>
                        <div className="payment-icon-box"><i className="fa-brands fa-cc-mastercard" title="Mastercard"></i></div>
                        <div className="payment-icon-box"><i className="fa-brands fa-google-pay" title="Google Pay"></i></div>
                        <div className="payment-icon-box"><i className="fa-brands fa-apple-pay" title="Apple Pay"></i></div>
                        <img 
                            alt="BLIK" 
                            className="payment-icon-box" 
                            src={Blik} 
                            style={{ height: "18px", width: "auto", filter: "none", padding: "2px" }} 
                        />
                    </div>
                </div>

                <hr className="footer-divider" />

                {/* LOWER FOOTER - Pełne dane zgodne z prawem PL */}
                <div className="lower-footer">
                    <div className="footer-company-info" style={{ textAlign: "center", fontSize: "12px", opacity: "0.8", marginBottom: "15px", lineHeight: "1.6" }}>
                        <p><strong>Właścicielem sklepu jest:</strong> Joachim Esangbedo</p>
                        <p>Adres do korespondencji: ul. Nowodworska 39/6, 54-433 Wrocław</p>
                        <p>NIP: 8943268275 | Sprzedaż w ramach działalności nierejestrowanej</p>
                    </div>
                    <div className="copyright">
                        <p>© {new Date().getFullYear()} Banda Frytki. Wszelkie prawa zastrzeżone.</p>
                        <p className="creator">Designed & Coded by JJ</p>
                    </div>
                </div>

                {/* Przycisk Scroll-to-top (widoczny tylko gdy isVisible === true) */}
                {isVisible && (
                    <button className="scroll-to-top-gold" aria-label="Przewiń do góry" onClick={scrollToTop} type="button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </button>
                )}
            </footer>
        </section>
    );
};

export default Footer;