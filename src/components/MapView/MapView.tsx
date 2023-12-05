import { useContext, useLayoutEffect, useRef } from "react"
import { MapContext, PlacesContext } from "../../context"
//@ts-expect-error to fix mapbox deply error
import mapboxgl from "!mapbox-gl"
import { Loading } from ".."

export const MapView = () => {

  const mapBox = useRef <HTMLDivElement>  (null)
  const { isLoading, userLocation } = useContext(PlacesContext)
  const { setMap } = useContext(MapContext)

  useLayoutEffect(() => {
    if (!isLoading) {
    const map = new mapboxgl.Map({
    container: mapBox.current!, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: userLocation, // starting position [lng, lat]
    zoom: 11, // starting zoom
    });

    setMap(map)
    }
  }, [isLoading])


  if (isLoading) return (<Loading/>)
  return (
    <div ref={mapBox}
    style={{
      height: "100vh",
      width: "100vw",
      position: "fixed",
      top: 0,
      left: 0
    }}
    >
      {userLocation?.join(', ')}
      </div>
  )
}
