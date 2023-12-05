
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import "bootswatch/dist/morph/bootstrap.min.css";
import ReactDOM from 'react-dom/client';
import MapsApp from './MapsApp.tsx';
import React from 'react';

if (!navigator.geolocation) {
  alert ( "Tu navegador no tiene acceso a la geolocalizacion" );
  throw new Error ("Tu navegador no tiene acceso a la geolocalizacion")
}

 
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCES_TOKEN;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
)
