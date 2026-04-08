import React, { useState, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/InPostMap.css';

const goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    iconSize: [30, 45], // Nieco większy, bardziej premium
    iconAnchor: [15, 45],
    popupAnchor: [0, -40],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
});

const InPostMap = ({ onSelectPoint }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [foundLockers, setFoundLockers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const mapRef = useRef(null);

    const searchLockersNearby = useCallback((lat, lng) => {
        if (!window.google) return;
        setIsLoading(true);
        
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            location: new window.google.maps.LatLng(lat, lng),
            radius: '3500', 
            query: 'paczkomat inpost'
        };

        service.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const points = results.map(place => ({
                    id: place.place_id,
                    name: place.name.replace("Paczkomat InPost ", ""),
                    address: place.formatted_address,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                }));
                setFoundLockers(points);
            }
            setIsLoading(false);
        });
    }, []);

  const handleSearch = () => {
    if (!searchTerm || !window.google) return;
    
    const geocoder = new window.google.maps.Geocoder();
    
    // Szukamy adresu klienta (np. "Mickiewicza 12, Poznań")
    geocoder.geocode({ 
        address: searchTerm, 
        componentRestrictions: { country: 'PL' } 
    }, (results, status) => {
        if (status === 'OK') {
            const { lat, lng } = results[0].geometry.location;
            const latNum = lat();
            const lngNum = lng();

            // 1. Przenieś mapę do klienta
            mapRef.current.flyTo([latNum, lngNum], 17, { duration: 1.5 });

            // 2. Natychmiast szukaj paczkomatów w tej nowej okolicy
            searchLockersNearby(latNum, lngNum);
        } else {
            alert("Nie znaleźliśmy tego adresu. Spróbuj podać miasto i ulicę.");
        }
    });
};
    const MapController = () => {
        useMapEvents({
            moveend: (e) => {
                const center = e.target.getCenter();
                searchLockersNearby(center.lat, center.lng);
            }
        });
        return null;
    };

    return (
        <div className="premium-map-container">
            <div className="map-glass-overlay">
                <div className="search-box-premium">
                    <input 
                        type="text" 
                        placeholder="Znajdź najbliższy punkt..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button onClick={handleSearch} className="search-action-btn">
                        <span>SZUKAJ</span>
                    </button>
                </div>
            </div>

            <MapContainer 
                center={[52.2297, 21.0122]} 
                zoom={13} 
                zoomControl={false} // Usuwamy standardowe przyciski dla czystego wyglądu
                className="leaflet-prestige"
                whenReady={(e) => { mapRef.current = e.target; }}
            >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                <MapController />

                {foundLockers.map(locker => (
                    <Marker key={locker.id} position={[locker.lat, locker.lng]} icon={goldIcon}>
                        <Popup className="premium-popup">
                            <div className="popup-card">
                                <h3>{locker.name}</h3>
                                <p>{locker.address}</p>
                                <button onClick={() => onSelectPoint(locker)}>
                                    WYBIERZ TEN PUNKT
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {isLoading && (
                <div className="loading-shimmer">
                    <div className="spinner"></div>
                    <span>Lokalizowanie paczkomatów Inpost...</span>
                </div>
            )}
        </div>
    );
};

export default InPostMap;