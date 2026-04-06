import React, { useState, useEffect } from 'react';
import './App.css';
import MyNavbar from './components/Navbar';
import Header from './components/Header';
import Product from './components/Product';
import OrderFinalization from './components/OrderFinalization';
import Payment from './components/Payment';
import Footer from './components/Footer';
import TermsAndConditions from './components/TermsAndConditions'; 
import PrivacyPolicyAndCookies from './components/PrivacyPolicyandCookies';
import ReturnsAndComplaints from './components/ReturnsAndComplaints';
import DeliveryAndPayment from './components/DeliveryAndPayment';
import Rodo from './components/Rodo';
import Links from './components/Links';
import YouTubeSection from './components/YouTubeSection';
function App() {
      const [shake, setShake] = useState(false);
  // Stan kontrolujący co wyświetlamy: 'shop' lub 'checkout'
  const [view, setView] = useState(localStorage.getItem('savedView') || 'shop');
const [selectedSize, setSelectedSize] = useState(() => {
    return localStorage.getItem("selectedSize") || ""; 
});

useEffect(() => {
    localStorage.setItem("selectedSize", selectedSize);
}, [selectedSize]);

const triggerGlobalShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 800);
};
  // Funkcja, którą przekażemy do komponentu Product
  const goToCheckout = (size) => {
    setSelectedSize(size);
    setView('checkout');
    localStorage.setItem('savedView', 'checkout');
    // Przewiń na górę strony przy zmianie widoku
    window.scrollTo(0, 0);
  };
 const goBackToShop = () => {
    setView('shop'); // Zmieniamy z 'kupa' na 'shop'
    localStorage.setItem('savedView', 'shop');
    // Jeśli używasz React Routera, wymuś powrót do strony głównej:
    window.history.pushState({}, '', '/'); 
    window.scrollTo(0, 0);
};
// Funkcja dla Footer
const navigateTo = (viewName, e) => {
    if (e) e.preventDefault(); // Blokujemy przeładowanie strony
    setView(viewName);
    localStorage.setItem('savedView', viewName);
    window.scrollTo(0, 0);
};
return (
  <div className="App">
    <MyNavbar onBrandClick={goBackToShop} />
    
    <main>
      {/* 1. Widok sklepu */}
      {view === 'shop' && (
        <>
          <Header />
          <Product onBuyNow={goToCheckout} shake={shake} setShake={setShake} />
          <Links />
          <YouTubeSection />
        </>
      )}

      {/* 2. Widok formularza (Checkout) */}
      {view === 'checkout' && (
        <OrderFinalization 
          selectedSize={selectedSize} 
          shake={shake}
          setShake={setShake}
          onSuccess={() => setView('payment')} // To jest klucz do przejścia dalej!
          onBack={goBackToShop}
        />
      )}

      {/* 3. Widok płatności */}
      {view === 'payment' && (
        <Payment 
        shake={shake}
         setShake={setShake}
         onBack={() => {
          setView('checkout');
          localStorage.setItem('savedView', 'checkout');
          window.history.pushState({}, '', '/');
          window.scrollTo(0, 0);
         }} />
        )}

      {view === 'terms' && (
    <TermsAndConditions onBack={goBackToShop} />
  )}

      {view === 'privacy' && (
    <PrivacyPolicyAndCookies onBack={goBackToShop} />
  )}
      {view === 'delivery' && (
    <DeliveryAndPayment onBack={goBackToShop} />
  )}
      {view === 'returns' && (
    <ReturnsAndComplaints onBack={goBackToShop} />
  )}
      {view === 'rodo' && (
    <Rodo onBack={goBackToShop} />
  )}
    </main>
  <Footer navigate={navigateTo} />
  </div>
);
}

export default App;