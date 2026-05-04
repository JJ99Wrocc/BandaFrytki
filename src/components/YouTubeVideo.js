import React, { useState } from "react";

const YouTubeVideo = ({ videoId, title, type = "video" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Używamy maxresdefault dla najlepszej jakości, jeśli nie ma - hqdefault
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (isLoaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allowFullScreen
        allow="autoplay; encrypted-media"
      ></iframe>
    );
  }

  return (
    <div 
      className="yt-lazy-load" 
      onClick={() => setIsLoaded(true)}
      style={{
        position: 'absolute', // Kluczowe: musi być absolute, bo rodzic ma padding-bottom
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${thumbnailUrl}), url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`, // Fallback do gorszej jakości jeśli maxres nie istnieje
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      }}
    >
      {/* Przycisk Play stylizowany na YouTube */}
      <div style={{
        width: '68px',
        height: '48px',
        backgroundColor: 'rgba(33, 33, 33, 0.8)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s'
      }} className="yt-play-btn">
        <div style={{
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '10px 0 10px 20px',
          borderColor: 'transparent transparent transparent #ffffff',
          marginLeft: '4px'
        }}></div>
      </div>
    </div>
  );
};

export default YouTubeVideo;