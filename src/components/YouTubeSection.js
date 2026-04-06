import React, { useEffect, useState } from "react";
import axios from "axios"; 
import '../css/YouTubeSection.css';

const YouTubeSection = () => {
    const [longVideos, setLongVideos] = useState([]); 
    const [shortsVideos, setShortsVideos] = useState([]);
    const [currentShortIndex, setCurrentShortIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const API_KEY = "AIzaSyA8sRkD5Jt45fZV2RTWDEfRzrxuhRQZymA";
    const CHANNEL_ID = "UCOm0Nx84UmCnB6mMFv-rl9A"; 

    useEffect(() => {
        const fetchLatestContent = async () => {
            try {
                // 1. TRIK: Zamiana UC na UU w ID kanału daje ID playlisty "Wgrane filmy"
                // To wyciąga WSZYSTKO co jest na kanale, pomijając błędy wyszukiwarki
                const uploadPlaylistId = CHANNEL_ID.replace(/^UC/, 'UU');

                const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadPlaylistId}&part=snippet,contentDetails&maxResults=50`;
                const playlistRes = await axios.get(playlistUrl);
                const allItems = playlistRes.data.items;

                // 2. Pobieramy detale (duration), żeby odróżnić filmy od shortów
                const videoIds = allItems.map(item => item.contentDetails.videoId).join(',');
                const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,snippet`;
                const detailsRes = await axios.get(detailsUrl);
                const allVideosWithDetails = detailsRes.data.items;

                // 3. FILTROWANIE
                // Filmy: mają M (minuty) lub H (godziny) w czasie trwania
                const vids = allVideosWithDetails.filter(v => 
                    v.contentDetails.duration.includes('M') || 
                    v.contentDetails.duration.includes('H')
                );

                // Shorty: tylko sekundy (brak M i H)
                const shorts = allVideosWithDetails.filter(v => 
                    !v.contentDetails.duration.includes('M') && 
                    !v.contentDetails.duration.includes('H')
                );

                setLongVideos(vids);
                setShortsVideos(shorts);

            } catch (err) {
                console.error("BŁĄD API:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLatestContent();
    }, []);

    // FUNKCJE STEROWANIA
    const nextShort = () => {
        if (shortsVideos.length > 0) {
            setCurrentShortIndex((prev) => (prev + 1) % shortsVideos.length);
        }
    };

    const prevShort = () => {
        if (shortsVideos.length > 0) {
            setCurrentShortIndex((prev) => (prev === 0 ? shortsVideos.length - 1 : prev - 1));
        }
    };

    const nextVideo = () => {
        if (longVideos.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % longVideos.length);
        }
    };

    const prevVideo = () => {
        if (longVideos.length > 0) {
            setCurrentIndex((prev) => (prev === 0 ? longVideos.length - 1 : prev - 1));
        }
    };

    if (isLoading) return <div className="yt-loader">SZUKAM TWOICH FILMÓW...</div>;

    return (
        <section className="yt-section" id="videos-section">
            <div className="yt-container">
                <h2 className="yt-title">WIDEO I SHORTY</h2>
                <p className="yt-description">ZOBACZ CO NOWEGO NA KANALE</p>

                <div className="yt-split-grid">
                    {/* LEWA: SHORTY */}
                    <div className="yt-column yt-shorts-col">
                        <span className="yt-label">OSTATNIE SHORTY</span>
                        <div className="yt-shorts-wrapper">
                            {shortsVideos.length > 0 ? (
                                <iframe 
                                    key={`short-${shortsVideos[currentShortIndex].id}`}
                                    src={`https://www.youtube.com/embed/${shortsVideos[currentShortIndex].id}?rel=0`} 
                                    title="YouTube Short"
                                    allowFullScreen
                                ></iframe>
                            ) : <p>Brak shortów</p>}
                        </div>
                        <div className="short-nav-container">
                            <div className="back-short" onClick={prevShort}></div>
                            <span className="yt-counter">
                                    {shortsVideos.length > 0 ? `${currentShortIndex + 1} / ${shortsVideos.length}` : "0 / 0"}
                                </span>
                            <div className="next-short" onClick={nextShort}></div>
                        </div>
                    </div>

                    {/* PRAWA: FILMY */}
                    <div className="yt-column yt-video-col">
                        <div className="yt-header-row">
                            <span className="yt-label">OSTATNIE FILMY</span>
                            <div className="video-nav-container">
                                <div className="back-video" onClick={prevVideo}></div>
                                <span className="yt-counter">
                                    {longVideos.length > 0 ? `${currentIndex + 1} / ${longVideos.length}` : "0 / 0"}
                                </span>
                                <div className="next-videos" onClick={nextVideo}></div>
                            </div>
                        </div>

                        <div className="yt-video-wrapper">
                            {longVideos.length > 0 ? (
                                <iframe 
                                    key={`video-${longVideos[currentIndex].id}`}
                                    src={`https://www.youtube.com/embed/${longVideos[currentIndex].id}?rel=0`} 
                                    title="YouTube Video"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="yt-error">Nie znaleziono długich filmów.</div>
                            )}
                        </div>
                        
                        {longVideos[currentIndex] && (
                            <h3 className="yt-video-name">
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