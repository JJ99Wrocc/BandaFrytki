import React, { useState } from 'react';
import '../css/Product.css';

// Importy zdjęć - upewnij się, że ścieżki są poprawne w Twoim folderze src/photo
import KoszulkaFront from '../photo/ZdjJjKoszulka.webp';
import Detal1 from '../photo/Detal1.webp';
import Detal2 from '../photo/Detal2.webp';

function Product({ onBuyNow, shake, setShake, navigate, currentView,price }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    const ProductImages = [KoszulkaFront, Detal1, Detal2];
    const [mainImage, setMainImage] = useState(ProductImages[0]);
    const [zoomStyle, setZoomStyle] = useState({ display: 'none' });

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    
    // LOGIKA LUPY (Magnifier)
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        const isMobile = window.innerWidth <= 768;
        const offset = isMobile ? -50 : 0;

        setZoomStyle({
            display: 'block',
            left: `${x}px`,
            top: `${y - offset}px`,
            backgroundImage: `url(${mainImage})`,
            backgroundPosition: `${percentX}% ${percentY}%`,
            backgroundSize: `${rect.width * 2.5}px ${rect.height * 2.5}px`
        });
    };
    const handleOnTermsAndPrivacyLink = (e, targetID) =>{
            if(navigate){
                navigate(targetID)
            }

    }
    // LOGIKA PRZYCISKU KUP TERAZ
    const handleBuyNowClick = () => {
        if (!selectedSize || !termsAccepted) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }
        
        if (onBuyNow) {
            onBuyNow(selectedSize); // Przekazuje rozmiar do App.js
        }
    };

    return (
        <section className="product" id="product-section" aria-labelledby="product-heading">
            <div className="product-container">
                <h1 id="product-heading">DESIGN 01/ 2026</h1>
                <p className="drop-subtitle" role="status">NAKŁAD WYCZERPYWALNY</p>

                <div className="product-wrapper">
                    {/* LEWA STRONA - ZDJĘCIA */}
                    <div className="left-side">
                        <div 
                            className="main-img-container" 
                            aria-live="polite"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setZoomStyle(prev => ({ ...prev, display: 'block' }))}
                            onMouseLeave={() => setZoomStyle({ display: 'none' })}
                            onTouchMove={handleMouseMove}
                        >
                            <div className="img-glow-aura"></div>
                            <img 
                                key={mainImage}
                                className="main-img active-fade" 
                                src={mainImage} 
                                alt="BandaFrytki Tee" 
                            />
                            <div className="magnifier-lens" style={zoomStyle}></div>
                        </div>

                        <div className="thumbnail-grid" role="group">
                            {ProductImages.map((imgUrl, index) => (
                                <div 
                                    className={`thumb-wrapper ${mainImage === imgUrl ? 'selected' : ''}`} 
                                    key={index}
                                    onClick={() => setMainImage(imgUrl)}
                                >
                                    <img className="thumb-img" src={imgUrl} alt={`Detal ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PRAWA STRONA - INFO I ZAKUP */}
                    <div className="right-side">
                        <h2 className="product-name">BANDA FRYTKI TEE</h2>
                        
                        <div className="price-wrapper" aria-label="Cena">
                            <p className="product-price">{price} PLN</p>
                            <p className="shipping-info-small">
                                Dostawa już od <strong>12.5 PLN</strong>
                            </p>
                        </div>

                        <div className="description">
                            <p>
                                <span role="img" aria-label="Ikona szycia">🧵</span> 
                                250g Mięsista Bawełna | Krój Oversize | Trwały Haft
                            </p>
                        </div>

                        {/* WYBÓR ROZMIARU */}
                        <div className={`size-selection ${shake && !selectedSize ? 'shake-animation' : ''}`}>
                            <div className="size-header">
                                <span id="size-label" style={{ color: shake && !selectedSize ? '#ff4d4d' : 'inherit' }}>
                                    Wybierz rozmiar:
                                </span>
                                <button className="size-guide-btn">Tabela rozmiarów</button>
                            </div>
                            <div className="size-grid" role="group" aria-labelledby="size-label">
                                {sizes.map((size) => (
                                    <button 
                                        type="button" 
                                        key={size}
                                        className={`size-item ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* LEGAL CHECKBOX - WYMAGANY PRZEZ HOTPAY */}
                        <div className={`legal-checkbox-container ${shake && !termsAccepted ? 'shake-animation' : ''}`}>
                            <label className="legal-checkbox">
                                <input 
                                    type="checkbox" 
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    required
                                />
                                <span className="checkmark"></span>
                                <span className="label-text" style={{ color: shake && !termsAccepted ? '#ff4d4d' : 'inherit' }}>
                                    Akceptuję 
                                    <a onClick={(e) => navigate('terms', e)}>
        Regulamin
    </a>

     i

     <a onClick={(e) => navigate('privacy', e)} >
        Politykę Prywatności
    </a> *
                                </span>
                            </label>
                        </div>
                            <p className='required-fields-info'> * Pola obowiązkowe</p>

                        <button 
                            className="buy-now-btn" 
                            onClick={handleBuyNowClick}
                        >
                            KUP TERAZ
                        </button>

                        <p className="shipping-info" role="note">Wysyłka w 24h</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;