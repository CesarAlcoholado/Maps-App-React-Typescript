import axios from "axios";

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    proximity: "ip",
    language: "en",
    access_token: import.meta.env.VITE_MAPBOX_ACCES_TOKEN
  }

})


export default searchApi;