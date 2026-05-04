import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/InPostMap.css';

// Luksusowa ikona markera

const goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    iconSize: [35, 50], 
    iconAnchor: [17, 50],
    popupAnchor: [1, -45],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [50, 50]
});

const InPostMap = ({ onSelectPoint }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [foundLockers, setFoundLockers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const mapRef = useRef(null);
    const [selectedLocker, setSelectedLocker] = useState(null);
// Wewnątrz InPostMap.js dodaj:

useEffect(() => {
    // Sprawdzamy czy skrypt już istnieje, żeby nie dodawać go kilka razy
    if (!window.google) {
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCPY8BnvZykEOWAt6xRBa-t5fmJOWUTy9M&libraries=places";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        
        script.onload = () => {
            console.log("Google SDK załadowane dynamicznie");
        };
    }
}, []);
    const handleLockerSelect = (locker) => {
        setSelectedLocker(locker); // Zapisujemy lokalnie, żeby pokazać pod mapą
        if (onSelectPoint) {
            onSelectPoint(locker); // Wysyłamy do rodzica (np. do formularza zamówienia)
        }
        console.log("Wybrany paczkomat dla wysyłającego:", locker.name, locker.address);
    };

    // Szukanie paczkomatów przez Places API
    const searchLockersNearby = useCallback((lat, lng) => {
        if (!window.google) {
            console.error("Google Maps SDK nie załadowane!");
            return;
        }
        setIsLoading(true);
        setErrorMsg(null);
        
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            location: new window.google.maps.LatLng(lat, lng),
            radius: '4000', // Zwiększony promień do 4km
            query: 'paczkomat inpost'
        };

        service.textSearch(request, (results, status) => {
            console.log("Places API Status:", status);
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const points = results.map(place => ({
                    id: place.place_id,
                    name: place.name.replace("Paczkomat InPost ", ""),
                    address: place.formatted_address,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                }));
                setFoundLockers(points);
            } else {
                setErrorMsg(`Błąd Google: ${status}`);
            }
            setIsLoading(false);
        });
    }, []);

    // Szukanie adresu przez Geocoding API
    const handleSearch = () => {
        if (!searchTerm || !window.google) return;
        
        setIsLoading(true);
        const geocoder = new window.google.maps.Geocoder();
        
        geocoder.geocode({ 
            address: searchTerm, 
            componentRestrictions: { country: 'PL' } 
        }, (results, status) => {
            console.log("Geocoding Status:", status);
            if (status === 'OK') {
                const { lat, lng } = results[0].geometry.location;
                const latNum = lat();
                const lngNum = lng();
                
                // Płynny przelot kamery
                if (mapRef.current) {
                    mapRef.current.flyTo([latNum, lngNum], 15, {
                        animate: true,
                        duration: 1.5
                    });
                }
                searchLockersNearby(latNum, lngNum);
            } else {
                setIsLoading(false);
                setErrorMsg("Nie znaleziono adresu. Podaj miasto i ulicę.");
                setTimeout(() => setErrorMsg(null), 3000);
            }
        });
    };

    // Kontroler automatycznego odświeżania przy przesuwaniu mapy ręką
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
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="premium-map-wrapper"
        >
            <div className="map-interface-layer">
                {/* Panel wyszukiwania */}
                <div className="search-container-pro">
                    <input 
                        type="text" 
                        placeholder="np. Poznań, Mickiewicza..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="pro-input"
                    />
                    <button onClick={handleSearch} className="pro-search-btn">
                        {isLoading ? <div className="mini-spinner"></div> : "SZUKAJ"}
                    </button>
                </div>

                {/* Powiadomienie o błędzie */}
                <AnimatePresence>
                    {errorMsg && (
                        <motion.div 
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="error-toast"
                        >
                            {errorMsg}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <MapContainer 
                center={[52.2297, 21.0122]} 
                zoom={13} 
                zoomControl={false}
                className="main-leaflet-map"
                whenReady={(e) => { mapRef.current = e.target; }}
            >
                <TileLayer 
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; CartoDB'
                />
                <MapController />

                {foundLockers.map(locker => (
                    <Marker key={locker.id} position={[locker.lat, locker.lng]} icon={goldIcon}>
                        <Popup className="inpost-popup-style">
                            <div className="popup-premium-content">
                                <h3>Paczkomat InPost</h3>
                                <p className="locker-id">{locker.name}</p>
                                <p className="locker-addr">{locker.address}</p>
                                <button className="select-point-btn" onClick={() => handleLockerSelect(locker)}>
                                    WYBIERZ TEN PUNKT
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Informacja o wybranym paczkomacie wyświetlana pod mapą */}
            <div className="selected-point-info">
                {selectedLocker ? (
                    <>
                        <p><strong>Wybrany punkt:</strong> {selectedLocker.name}</p>
                        <p><strong>Adres:</strong> {selectedLocker.address}</p>
                        <input type="hidden" name="paczkomat_id" value={selectedLocker.name} />
                    </>
                ) : (
                    <p>Proszę wybrać paczkomat na mapie</p>
                )}
            </div>

            {/* Shimmer loading effect */}
            {isLoading && (
                <div className="map-loading-overlay">
                    <div className="shimmer-text">Lokalizowanie punktów InPost...</div>
                </div>
            )}
        </motion.div>
    );
};

export default InPostMap;