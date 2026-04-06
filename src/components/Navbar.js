import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';
const MyNavbar = ({ onBrandClick }) =>    {
  return (
<Navbar 
className="nav"
style={{ position: 'fixed', top: 0, zIndex: 1050 , width: '100%'}}
expand="lg"  >
  <Container>
    <Navbar.Brand as="span" 
        
          onClick={() => {
            onBrandClick(); // Wywołuje setView('shop') w App.js
            window.scrollTo(0, 0); // Przewija na samą górę
          }}
          >Banda Frytki</Navbar.Brand>
    
    {/* 1. Przycisk burgera (pokazuje się tylko na małych ekranach) */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
    {/* 2. Kontener, który będzie zwijany */}
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    
  </Container>
</Navbar>
  );
}

export default MyNavbar;