import { Home } from "./Pages/Home";
import { MapProvider, PlacesProvider } from "./context";

export default function MapsApp() {
  return (
    <PlacesProvider>
      <MapProvider>
        <Home/>
      </MapProvider>
    </PlacesProvider>

  )
}
