import React from "react";
import Marcin from '../photo/BandaMarcin.webp';
import JJ from '../photo/BandaJJ.webp';
import Aaron from '../photo/BandaAaron.webp';
import '../css/Links.css';

const Links = () => { 
  return (
    // aria-labelledby łączy sekcję z nagłówkiem h2
    <section id="links-section" className="links-section" aria-labelledby="links-title">
     <div className="bg-links">
         <div className="links-container">
        <h2 id="links-title" className="links-title">Znajdź nas na:</h2>
        <p className="links-description">
          Śledź nas na social mediach, aby być na bieżąco z najnowszymi informacjami i promocjami!
        </p>

        
          {/* role="list" informuje, że to zestaw powtarzalnych elementów */}
          <div className="links-grid" role="list">
            
            {/* OSOBA 1 */}
            <div className="links-person" role="listitem">
              <a 
                href="https://www.instagram.com/99flegg/" 
                className="social-link"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Odwiedź profil Aarona na Instagramie (otwiera się w nowej karcie)"
              >
              <p className="about-person">Aaron</p>
              <img className="social-link-img" src={Aaron} alt="Zdjęcie profilowe Aarona" />
                <span className="links-img-name"><i className="fa-brands fa-instagram"></i> 99flegg</span>
              </a>
            </div>

            {/* OSOBA 2 */}
            <div className="links-person" role="listitem">
              <a 
                href="https://www.instagram.com/panda_98mb/" 
                className="social-link"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Odwiedź profil Marcina na Instagramie (otwiera się w nowej karcie)"
              >
              <p className="about-person">Marcin</p>
              <img className="social-link-img" src={Marcin} alt="Zdjęcie profilowe Marcina" />
                <span className="links-img-name"><i className="fa-brands fa-instagram"></i> panda_98mb</span>
              </a>
            </div>

            {/* OSOBA 3 */}
            <div className="links-person" role="listitem">
              <a 
                href="https://www.instagram.com/jj99flex/" 
                className="social-link"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Odwiedź profil JJ na Instagramie (otwiera się w nowej karcie)"
              >
              <p className="about-person">JJ</p>
              <img className="social-link-img" src={JJ} alt="Zdjęcie profilowe JJ" />
                <span className="links-img-name"><i className="fa-brands fa-instagram"></i> jj99flex</span>
              </a>
            </div>

          </div>
        </div>
      </div>
 
    </section>
  );
};

export default Links;