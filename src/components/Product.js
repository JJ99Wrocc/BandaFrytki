import React ,{useState} from 'react';

import '../css/Product.css';
import KoszulkaFront from '../photo/ZdjJjKoszulka.webp'
import Detal1 from '../photo/Detal1.jpeg';
import Detal2 from '../photo/Detal2.jpeg';



function Product({onBuyNow, shake, setShake}) {


    const [selectedSize, setSelectedSize] = useState(null);


    const ProductImages = [
      KoszulkaFront,
    Detal1,
    Detal2,
    "https://picsum.photos/800/800?grayscale&sig=4"
    ]

    const [mainImage, setMainImage] = useState(ProductImages[0]);
    const [zoomStyle, setZoomStyle] = useState({display : 'none'});

  const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  
  // Pobieramy pozycję dotyku lub myszki względem OKNA PRZEGLĄDARKI
  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

  // Odejmujemy pozycję kontenera, żeby mieć współrzędne WEWNĄTRZ zdjęcia
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  // Obliczamy procenty dla tła lupy
  const percentX = (x / rect.width) * 100;
  const percentY = (y / rect.height) * 100;

  // OFFSET (Przesunięcie): 
  // Na desktopie (0) lupa będzie idealnie pod kursorem.
  // Na mobile (np. 100px) będzie nad palcem.
  const isMobile = window.innerWidth <= 768;
  const offset = isMobile ? -50 : 0; // Zmniejsz tę liczbę, jeśli jest ZA wysoko

  setZoomStyle({
    display: 'block',
    left: `${x}px`,
    top: `${y - offset}px`, // To 'y' jest już relatywne do obrazka!
    backgroundImage: `url(${mainImage})`,
    backgroundPosition: `${percentX}% ${percentY}%`,
    backgroundSize: `${rect.width * 2.5}px ${rect.height * 2.5}px`
  });
};

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const handlebuyNow = () =>{
      if(!selectedSize){
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return;
      }
      console.log("Przejście do płatności...");

      // 1. Zapisujemy rozmiar globalnie w App.js
 

     if (onBuyNow) {
            onBuyNow(selectedSize); 
        }
    };
      return (
 <section className="product" id="product-section" aria-labelledby="product-heading">
     <div className='product-container'>
    {/* id="product-heading" łączy sekcję z jej tytułem dla czytników */}
    <h1 id="product-heading">DESIGN 01/ 2026</h1>
    <p className="drop-subtitle" role="status">LIMITOWANY DROP / NAKŁAD WYCZERPYWALNY</p>

    <div className='product-wrapper'>
  <div className='left-side'>
  <div className="main-img-container" aria-live="polite" 
  onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoomStyle(prev => ({ ...prev, display: 'block' }))}
        onMouseLeave={() => setZoomStyle({ display: 'none' })}
        onTouchMove={handleMouseMove}>
  
    <div className="img-glow-aura"></div> 
    <img 
      key={mainImage}
          className='main-img active-fade' 
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
                  onClick={() => setMainImage(imgUrl)} // Tu dzieje się magia podmiany
                >
                  <img className='thumb-img' src={imgUrl} alt={`Detal ${index + 1}`} />
                </div>
              ))}
  </div>
</div>

      <div className='right-side'>
        <h2 className="product-name">BANDA FRYTKI TEE</h2>
        {/* aria-label pomaga przeczytać cenę poprawnie */}
        <p className='product-price' aria-label="Cena: 85 złotych">85 PLN</p>
        
        <div className="description">
          <p>
            <span role="img" aria-label="Ikona szycia">🧵</span> 
            250g Mięsista Bawełna | Krój Oversize | Trwały Haft
          </p>
        </div>

        <div className={`size-selection ${shake ? 'shake-animation' : ''}`}>
          <div className="size-header">
            <span id="size-label" style={{color: shake ? '#ff4d4d' : 'inherit'}}>Wybierz rozmiar:</span>
            <button 
              className="size-guide-btn" 
              aria-label="Otwórz tabelę rozmiarów"
            >
              Tabela rozmiarów
            </button>
          </div>
          
          {/* aria-labelledby łączy listę rozmiarów z etykietą "Wybierz rozmiar" */}
          <div className="size-grid" role="group" aria-labelledby="size-label">
            {sizes.map((size) => (
              <button 
                type="button"
                key={size} 
                className={`size-item ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)  }
                aria-pressed={selectedSize === size}
                aria-label={`Rozmiar ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Główny przycisk akcji */}
        <button className='buy-now-btn' aria-label="Przejdź do zakupu koszulki" onClick={handlebuyNow}>
          KUP TERAZ
        </button>
        
        <p className='shipping-info' role="note">
          Darmowa dostawa od 300 PLN | Wysyłka w 24h
        </p>
      </div>
    </div>
  </div>
</section>
  );
}
export default Product;