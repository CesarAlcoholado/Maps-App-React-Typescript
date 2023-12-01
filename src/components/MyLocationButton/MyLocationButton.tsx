import { useContext } from "react"
import { MapContext, PlacesContext } from "../../context"


export const MyLocationButton = () => {
  const { map, mapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const handleClick = () => {
    if (!mapReady) throw new Error ("Map is not ready");
    if (!userLocation) throw new Error ("User location not available");

    map?.flyTo({
      zoom: 13,
      center: userLocation
    })
  }

  return (
    <button
     className="btn btn-primary"
     style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: "999"
     }}
     onClick={ handleClick }
    >
      My Location
    </button>
  )
}
