import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const InPostMap = ({ onSelectPoint }) => {
    const [allPoints, setAllPoints] = useState([]);
    const [visiblePoints, setVisiblePoints] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('./paczkomaty.json');
                if (!res.ok) throw new Error("Brak pliku JSON");
                const data = await res.json();
                if (data && Array.isArray(data.items)) setAllPoints(data.items);
            } catch (err) {
                console.error("Błąd mapy:", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const filterVisiblePoints = useCallback((mapInstance) => {
        if (!mapInstance || allPoints.length === 0) return;
        const zoom = mapInstance.getZoom();
        if (zoom < 13) { setVisiblePoints([]); return; }
        const bounds = mapInstance.getBounds();
        const filtered = allPoints.filter(p => p.location && bounds.contains([p.location.latitude, p.location.longitude]));
        setVisiblePoints(filtered.slice(0, 100));
    }, [allPoints]);

    const MapEvents = () => {
        useMapEvents({
            moveend: (e) => filterVisiblePoints(e.target),
            zoomend: (e) => filterVisiblePoints(e.target),
        });
        return null;
    };

    return (
        <div style={{ height: '400px', width: '100%', position: 'relative', border: '2px solid #fc0' }}>
            <MapContainer center={[52.2297, 21.0122]} zoom={13} style={{ height: '100%', width: '100%' }} whenReady={(e) => filterVisiblePoints(e.target)}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapEvents />
                {visiblePoints.map((point) => (
                    <Marker key={point.name} position={[point.location.latitude, point.location.longitude]} icon={customIcon}>
                        <Popup>
                            <strong>{point.name}</strong><br/>
                            <button onClick={() => onSelectPoint(point)} style={{background:'#fc0', border:'none', cursor:'pointer', width:'100%', marginTop:'5px'}}>WYBIERZ 🍟</button>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            {isLoading && <div style={{position:'absolute', top:10, right:10, zIndex:1000, background:'#fff', padding:'5px'}}>Ładowanie...</div>}
        </div>
    );
};

export default InPostMap;