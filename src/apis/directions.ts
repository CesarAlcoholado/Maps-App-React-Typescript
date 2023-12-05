import axios from "axios";

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: true,
    geometries: "geojson",
    language: "en",
    overview: "full",
    steps: true,
    access_token: import.meta.env.VITE_MAPBOX_ACCES_TOKEN
  }

})


export default directionsApi;