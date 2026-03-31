import React, { useRef, useState } from 'react';
import '../css/Header.css';

const Header = () => {
  // Stan aktywności (ID 1 na start dla mobile, null dla desktopu żeby wszystko było wolne)
  const [activeVideoId, setActiveVideoId] = useState(window.innerWidth < 576 ? 1 : null);
  // Flaga unmute tylko dla trybu mobile
  const [isUnmuted, setIsUnmuted] = useState(false);
  
  const videoRefs = useRef({});

  const videos = [
    { id: 1, src: 'CzarnaKoalicja.mp4' },
    { id: 2, src: 'Elektrycy.mp4' },
    { id: 3, src: 'KradziezAuta.mp4' },
    { id: 4, src: 'WkRuchala.mp4' }
  ];

  // --- LOGIKA MOBILE (PONIŻEJ 576px) ---
const handleVideoEnd = (id) => {
    if (window.innerWidth < 576) {
      const currentIndex = videos.findIndex(v => v.id === id);
      const nextIndex = (currentIndex + 1) % videos.length;
      const nextId = videos[nextIndex].id;

      const nextVid = videoRefs.current[nextId];
      
      if (nextVid) {
        // Ważne: najpierw przygotuj wideo
        nextVid.muted = !isUnmuted;
        nextVid.playbackRate = isUnmuted ? 1.0 : 0.5;
        
        // Zmień stan, aby CSS przełączył widoczność
        setActiveVideoId(nextId);

        // Odpal wideo z lekkim opóźnieniem lub natychmiast
        nextVid.play().catch(error => console.error("Autoplay failed:", error));
      }
    }
  };
  // --- LOGIKA KLIKNIĘCIA (WSPÓLNA ALE ROZDZIELONA) ---
  const handleVideoClick = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (window.innerWidth < 576) {
      // LOGIKA MOBILE: Przełączanie Unmute/Mute na tym samym filmie
      if (activeVideoId === id) {
        const newUnmuteState = !isUnmuted;
        setIsUnmuted(newUnmuteState);
        video.muted = !newUnmuteState;
        video.playbackRate = newUnmuteState ? 1.0 : 0.5;
        if (newUnmuteState) video.play();
      }
    } else {
      // LOGIKA DESKTOP (TWOJA ORYGINALNA):
      if (activeVideoId === id) {
        video.muted = true;
        video.playbackRate = 0.5;
        setActiveVideoId(null);
      } else {
        if (activeVideoId !== null && videoRefs.current[activeVideoId]) {
          videoRefs.current[activeVideoId].muted = true;
          videoRefs.current[activeVideoId].playbackRate = 0.3;
        }
        video.muted = false;
        video.playbackRate = 1.0;
        setActiveVideoId(id);
      }
    }
  };

  return (
    <section className="header" id="header-section">
      <div className="video-grid">
        {videos.map((video) => (
          <div 
            key={video.id}
            className={`video-wrapper ${activeVideoId === video.id ? 'active' : 'idle'}`}
            onClick={() => handleVideoClick(video.id)}
          >
            {/* 1. WARSTWA TŁA (Tylko desktop) */}
            {activeVideoId === video.id && window.innerWidth >= 576 && (
              <video autoPlay loop muted playsInline className="video-background-blur">
                <source src={`${process.env.PUBLIC_URL}/videos/${video.src}`} type="video/mp4" />
              </video>
            )}

            {/* 2. GŁÓWNE WIDEO */}
            <video 
              ref={el => videoRefs.current[video.id] = el}
              autoPlay 
              muted={activeVideoId === video.id ? !isUnmuted : true}// Zawsze true na starcie dla przeglądarki
              loop={window.innerWidth >= 576}  
              playsInline 
              className="header-video-item"
              onLoadedMetadata={(e) => {
                // Na starcie ustawiamy 0.5, chyba że to aktywny i odciszony na mobile
                if (window.innerWidth < 576) {
                  e.target.playbackRate = (activeVideoId === video.id && isUnmuted) ? 1.0 : 0.5;
                } else {
                  e.target.playbackRate = activeVideoId === video.id ? 1.0 : 0.5;
                }
              }} 
              onEnded={() => handleVideoEnd(video.id)}
            >
              <source src={`${process.env.PUBLIC_URL}/videos/${video.src}`} type="video/mp4" />
            </video>

            {/* PRZYCISK UNMUTE */}
            {/* Na Desktopie: pokazuj zawsze gdy nieaktywny */}
            {/* Na Mobile: pokazuj na aktywnym, gdy isUnmuted jest false */}
            {((window.innerWidth >= 576 && activeVideoId !== video.id) || 
              (window.innerWidth < 576 && activeVideoId === video.id && !isUnmuted)) && (
              <div className="unmute-overlay">
                <button className="unmute-button">🔊 Włącz</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="header-overlay">
        <h1 className="header-title">Banda Frytki</h1>
        <p className="header-description">Świat pełen zabawy</p>
      </div>
      
    <div className="button-wrapper">
  <button className="header-button">Zgarnij drop</button>
  {/* Strzałka zagnieżdżona w wrapperze */}
  <div className="scroll-arrow-container">
    <div className="chevron"></div>
    <div className="chevron"></div>
    <div className="chevron"></div>
  </div>
</div>
    </section>
  );
}

export default Header;