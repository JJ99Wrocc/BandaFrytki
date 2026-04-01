import React ,{useState} from 'react';
import '../css/Product.css';
import KoszulkaFront from '../photo/ZdjJjKoszulka.webp'


function Product() {
    const [selectedSize, setSelectedSize] = useState(null);

    const ProductImages = [
      KoszulkaFront,
    "https://picsum.photos/800/800?grayscale&sig=2",
    "https://picsum.photos/800/800?grayscale&sig=3",
    "https://picsum.photos/800/800?grayscale&sig=4"
    ]

    const [mainImage, setMainImage] = useState(ProductImages[0]);
    const [zoomStyle, setZoomStyle] = useState({display : 'none'});

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Pozycja kursora/palca wewnątrz obrazka (procentowo)
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    // Pozycja lupy (środek lupy na kursorze)
    const posX = e.pageX - left - window.scrollX;
    const posY = e.pageY - top - window.scrollY;

    setZoomStyle({
      display: 'block',
      left: `${posX}px`,
      top: `${posY}px`,
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: `${width * 2.5}px ${height * 2.5}px` // Powiększenie 2.5x
    });
  };

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
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

        <div className='size-selection'>
          <div className="size-header">
            <span id="size-label">Wybierz rozmiar:</span>
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
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
                aria-label={`Rozmiar ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Główny przycisk akcji */}
        <button className='buy-now-btn' aria-label="Przejdź do zakupu koszulki">
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