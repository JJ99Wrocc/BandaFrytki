import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';

const MyNavbar = ({ onBrandClick, navigate, currentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);



  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    closeMenu(); // Zamykamy drawer od razu

    if(navigate){
      navigate(targetId)
    }
  };

  return (
    <section id="navbar" aria-label="Nawigacja główna">
      {/* Poprawiony Overlay - teraz zamyka po kliknięciu w tło */}
      <div 
        className={`menu-overlay ${isOpen ? 'active' : ''}`} 
        onClick={closeMenu}
      ></div>

      <Navbar
        className={`nav-custom ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}
        fixed="top"
        expand="lg"
      >
        <Container className="position-relative d-flex justify-content-between align-items-center">
          <Navbar.Brand
            as="span"
            className="brand-luxury"
            onClick={() => {
              onBrandClick();
              window.scrollTo(0, 0);
              closeMenu();
            }}
          >
            BANDA<span>FRYTKI</span>
          </Navbar.Brand>

          <button 
            className={`unique-burger ${isOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <div className="burger-layers">
              <span className="layer top-bun"></span>
              <span className="layer meat"></span>
              <span className="layer bottom-bun"></span>
            </div>
          </button>

          <div className={`side-drawer ${isOpen ? 'show' : ''}`}>
            <div className="drawer-content">
              <div className="drawer-header">
                <span className="menu-label">NAWIGACJA</span>
              </div>
              
              <Nav className="nav-links-list" as="ul">
                <li className="nav-item-wrapper">
                  <a href="#header-section" onClick={(e) => handleNavLinkClick(e, '#header-section')} className="nav-link-custom">
           Strona główna
                  </a>
                </li>
                <li className="nav-item-wrapper">
                  <a href="#product-section" onClick={(e) => handleNavLinkClick(e, '#product-section')} className="nav-link-custom">
                    Produkt
                  </a>
                </li>
                <li className="nav-item-wrapper">
                  <a href="#links-section" onClick={(e) => handleNavLinkClick(e, '#links-section')} className="nav-link-custom">
                   Linki
                  </a>
                </li>
                <li className="nav-item-wrapper">
                  <a href="#videos-section" onClick={(e) => handleNavLinkClick(e, '#videos-section')} className="nav-link-custom">
                    Filmy
                  </a>
                </li>
              </Nav>

              <div className="drawer-footer">
                <p className='drawer-footer-p'>Odwiedź nasze social media</p>
                <div className="social-mini">
                   <a className='IG'
                   target="_blank" 
    rel="noopener noreferrer"
    aria-label="Odwiedź nasz kanał na Insagramie"
    href='https://www.instagram.com/bandafrytki/'
    > <i className="fa-brands fa-instagram"></i>  </a>
                 <a className='FB'
                 target="_blank" 
    rel="noopener noreferrer"
    aria-label="Odwiedź nasz kanał na Facebook"
                 href='https://www.facebook.com/BandaFrytki'
                 > <i className="fa-brands fa-facebook"></i>  </a> 
                <a className='YT'
                target="_blank" 
    rel="noopener noreferrer"
    aria-label="Odwiedź nasz kanał na YouTube"
     href='https://www.youtube.com/@BANDA_FRYTKI'> <i className="fa-brands fa-youtube"></i> </a>
                </div>
                <p>© 2026 BANDA FRYTKI</p>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
    </section>
  );
};

export default MyNavbar;