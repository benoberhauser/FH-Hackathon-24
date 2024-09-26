import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader'; 
import './Map.css'; 

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyC2Wi_aMWsf17s6ol07FgEC9dk5pMOiGVg",
        version: "weekly",
      });

      await loader.load();
      const google = window.google;

      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 46.624722, lng: 14.305278 }, // Klagenfurt
        zoom: 10,
        mapId: 'DEMO_MAP_ID',
      });

      // Shuttle Station Standorte
      const shuttleLocations = [
        { lat: 46.77032387154223, lng: 14.823692040673762, name: 'Shuttle Station - Möglichkeit 1' },
        { lat: 46.80645075287375, lng: 14.558239123596106, name: 'Shuttle Station - Möglichkeit 2' },
        { lat: 46.7664361858222, lng: 14.360194455318874, name: 'Shuttle Station - Möglichkeit 3' },
      ];

      // Shuttle-Bus-SVG-Icon
      const parser = new DOMParser();
      const pinSvgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="28" fill="#FF5733"></rect>
          <g>
            <rect x="15" y="20" width="26" height="16" rx="3" ry="3" fill="white"></rect>
            <rect x="17" y="22" width="8" height="12" rx="1" ry="1" fill="#FF5733"></rect>
            <rect x="27" y="22" width="10" height="12" rx="1" ry="1" fill="#FF5733"></rect>
            <circle cx="19" cy="37" r="2" fill="black"></circle>
            <circle cx="35" cy="37" r="2" fill="black"></circle>
            <rect x="32" y="22" width="6" height="12" fill="white"></rect>
          </g>
        </svg>
      `;

      const pinSvg = parser.parseFromString(pinSvgString, 'image/svg+xml').documentElement;

      // Erstellen der AdvancedMarkerElement für Shuttle-Stationen
      shuttleLocations.forEach((location) => {
        new AdvancedMarkerElement({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          content: pinSvg.cloneNode(true), // Das SVG-Element für jeden Marker klonen
          title: location.name,
        });
      });
    };

    initializeMap();
  }, []);

  return (
    <div className="map-container">
      <h1 className="map-title">Entdecke deine Shuttle-Möglichkeiten</h1>
      <p className="map-subtitle">Finde heraus, welche Shuttle-Stationen dir zur Verfügung stehen.</p>
      <div ref={mapRef} className="styled-map" />
    </div>
  );
}
