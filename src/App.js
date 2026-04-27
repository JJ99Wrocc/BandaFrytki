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
  const [finalPrice, setFinalPrice] = useState(0);
      const [shake, setShake] = useState(false);
     const [customerData, setCustomerData] = useState(null);
      const [step, setStep] = useState('shop')
  // Stan kontrolujący co wyświetlamy: 'shop' lub 'checkout'
  const [view, setView] = useState(localStorage.getItem('savedView') || 'shop');
const [selectedSize, setSelectedSize] = useState(() => {
    return localStorage.getItem("selectedSize") || ""; 
});

useEffect(() => {
    localStorage.setItem("selectedSize", selectedSize);
}, [selectedSize]);
// App.js
const finalizujZamowienieWBazie = async () => {
    // Tutaj możesz dodać np. powiadomienie dla użytkownika
    alert("Dziękujemy za wpłatę! Twoje zamówienie jest przetwarzane.");
    
    // Opcjonalnie: czyścimy URL z parametrów, żeby po odświeżeniu strony 
    // alert nie wyskakiwał w kółko
    window.history.replaceState({}, document.title, "/");
};
useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'success') {
        // Dopiero tutaj robisz fetch do bazy i wysyłasz maila!
        // Dane klienta masz w stanie customerData (o ile nie odświeżył strony ręcznie)
        finalizujZamowienieWBazie();
    }
}, []);
const handleOrderSuccess = (totalPrice, data, orderId) => {
    setFinalPrice(totalPrice); 
    setCustomerData({ ...data, orderId: orderId }); 
    
    // ZMIEŃ TO:
    setView('payment'); 
    localStorage.setItem('savedView', 'payment');
};
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
const price = 85; 
const navigateTo = (viewName, e) => {
    if (e) e.preventDefault(); 

    // Sprawdzamy, czy to jest link do sekcji (np. #product-section)
    if (typeof viewName === 'string' && viewName.startsWith('#')) {
        if (view !== 'shop') {
            // 1. Jeśli nie jesteśmy w sklepie, najpierw tam wróć
            setView('shop');
            localStorage.setItem('savedView', 'shop');
            
            // 2. Daj Reactowi 100ms na załadowanie DOM sklepu i zeskroluj
            setTimeout(() => {
                const element = document.querySelector(viewName);
                if (element) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            // Jeśli już jesteśmy w sklepie, po prostu skroluj
            const element = document.querySelector(viewName);
            if (element) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    } else {
        // Jeśli to normalna podstrona (np. 'terms')
        setView(viewName);
        localStorage.setItem('savedView', viewName);
        window.scrollTo(0, 0);
    }
};
return (
  <div className="App">

<MyNavbar onBrandClick={goBackToShop} navigate={navigateTo} currentView={view} />
    
    <main>
      {/* 1. Widok sklepu */}
      {view === 'shop' && (
        <>
          <Header />
          <Product price={price} onBuyNow={goToCheckout} shake={shake} setShake={setShake} navigate={navigateTo} />
          <Links />
          <YouTubeSection />
        </>
      )}

      {/* 2. Widok formularza (Checkout) */}
      {view === 'checkout' && (
        <OrderFinalization 
          price={price}
          selectedSize={selectedSize} 
          shake={shake}
          setShake={setShake}
          onSuccess={handleOrderSuccess}
          onBack={goBackToShop}
        />
      )}

      {/* 3. Widok płatności */}
      {view === 'payment' && (
        <Payment 
        totalPrice={finalPrice}
        customerData={customerData}
        selectedSize={selectedSize}
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
  <Footer navigate={navigateTo} onCLick={navigateTo} currentView={view} />
  </div>
);
}

export default App;