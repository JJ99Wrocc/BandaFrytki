import React, { useEffect, useState } from "react";
import axios from "axios"; 
import '../css/YouTubeSection.css';

const YouTubeSection = () => {
    const [longVideos, setLongVideos] = useState([]); 
    const [latestShort, setLatestShort] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const API_KEY = "AIzaSyA8sRkD5Jt45fZV2RTWDEfRzrxuhRQZymA";
    const CHANNEL_ID = "UCOm0Nx84UmCnB6mMFv-rl9A"; 

    useEffect(() => {
        const fetchLatestContent = async () => {
            try {
                // 1. Pobieramy max (50) ostatnich elementów, żeby na pewno znaleźć te 4 filmy
                const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&type=video`;
                const searchRes = await axios.get(searchUrl);
                const rawItems = searchRes.data.items;

                // 2. Pobieramy detale (czas trwania) dla wszystkich 50 elementów
                const videoIds = rawItems.map(item => item.id.videoId).join(',');
                const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,snippet`;
                const detailsRes = await axios.get(detailsUrl);

                const allFetched = detailsRes.data.items;

                // 3. FILTROWANIE
                // Long Vids: szukamy wszystkiego co ma 'M' (minuty) lub 'H' (godziny) w czasie trwania
                const vids = allFetched.filter(v => 
                    v.contentDetails.duration.includes('M') || 
                    v.contentDetails.duration.includes('H')
                );

                // Shorts: szukamy pierwszego z brzegu, który NIE ma 'M' i 'H' (czyli same sekundy 'S')
                const shorts = allFetched.filter(v => 
                    !v.contentDetails.duration.includes('M') && 
                    !v.contentDetails.duration.includes('H')
                );

                setLongVideos(vids);
                if (shorts.length > 0) setLatestShort(shorts[0]); // Bierzemy najnowszego Shorta

            } catch (err) {
                console.error("BŁĄD API:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLatestContent();
    }, []);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % longVideos.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? longVideos.length - 1 : prev - 1));

    if (isLoading) return <div className="yt-loader">SZUKAM TWOICH FILMÓW...</div>;

    return (
       <section className="yt-section" aria-labelledby="yt-section-title" id="videos-section">
    <div className="yt-container">
        <h2 id="yt-section-title" className="yt-title">LIVE FEED</h2>
        <p className="yt-description">ZOBACZ CO NOWEGO NA KANALE</p>

        <div className="yt-split-grid">
            {/* LEWA: LATEST SHORT */}
            <div className="yt-column yt-shorts-col">
                <span className="yt-label" id="label-short">LATEST SHORT</span>
                <div className="yt-shorts-wrapper" role="region" aria-labelledby="label-short">
                    {latestShort ? (
                        <iframe 
                            src={`https://www.youtube.com/embed/${latestShort.id}?rel=0`} 
                            title={`YouTube Short: ${latestShort.snippet.title}`} 
                            allowFullScreen
                            aria-describedby="label-short"
                        ></iframe>
                    ) : <p role="status">Brak shortów</p>}
                </div>
            </div>

            {/* PRAWA: SLIDER DLA DŁUGICH FILMÓW */}
            <div className="yt-column yt-video-col">
                <div className="yt-header-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span className="yt-label" id="label-videos">OFFICIAL VIDEOS</span>
                    {longVideos.length > 1 && (
                        <div className="yt-controls" role="group" aria-label="Sterowanie sliderem wideo">
                            <button 
                                onClick={prevSlide} 
                                className="yt-arrow" 
                                aria-label="Poprzedni film"
                            >
                                PREV
                            </button>
                            <button 
                                onClick={nextSlide} 
                                className="yt-arrow" 
                                aria-label="Następny film"
                            >
                                NEXT
                            </button>
                        </div>
                    )}
                </div>

                <div 
                    className="yt-video-wrapper" 
                    role="region" 
                    aria-live="polite" 
                    aria-labelledby="label-videos"
                >
                    {longVideos.length > 0 ? (
                        <iframe 
                            key={longVideos[currentIndex].id}
                            src={`https://www.youtube.com/embed/${longVideos[currentIndex].id}?rel=0`} 
                            title={`Film YouTube: ${longVideos[currentIndex].snippet.title}`} 
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div style={{padding: '20px', color: 'red'}} role="alert">
                            Nie znaleziono długich filmów w ostatnich 50 wrzutkach.
                        </div>
                    )}
                </div>
                
                {longVideos[currentIndex] && (
                    <h3 className="yt-video-name" aria-hidden="true">
                        {longVideos[currentIndex].snippet.title}
                    </h3>
                )}
            </div>
        </div>
    </div>
</section>
    );
};

export default YouTubeSection;