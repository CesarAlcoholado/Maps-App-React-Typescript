import { useContext, useEffect, useReducer } from "react";
import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "..";

export interface MapState {
  mapReady: boolean,
  map?: Map
  markers: Marker[]
}

const INITIAL_STATE: MapState = {
  mapReady: false,
  map: undefined,
  markers: []
}


interface Props {
  children: JSX.Element | JSX.Element [];
}

export const MapProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const { places } = useContext(PlacesContext)

  useEffect(() => {
    state.markers.forEach(marker=> marker.remove())
    const newMarkers: Marker[] = [];

    for (const place of places){
      const [lng, lat] = place.center;
      const popUp = new Popup()
        .setHTML(`
        <h6>${place.text_en}</h6>
        <h6>${place.place_name_en}</h6>
        `)
      
      const newMarker = new Marker()
      .setPopup( popUp )
      .setLngLat( [lng, lat] )
      .addTo( state.map! )

      newMarkers.push(newMarker)

    }

    //! Limpiar polyline

    dispatch({type: "SET_MARKERS", payload: newMarkers})
    
  }, [places])
  


  const setMap = (map: Map) => {

    const myLocationPopUp = new Popup ()
    .setHTML(`
    <h4>Here i am</h4>
    <p>This is my location</p>
    `)

    new Marker({
      color: "#0F52BA"
    })
    .setLngLat(map.getCenter())
    .setPopup(myLocationPopUp)
    .addTo(map)
    dispatch({type: "SET_MAP", payload: map})
  } 

  return (
    <MapContext.Provider value={{
      ...state,
      //methods
      setMap
    }}>
      { children }
    </MapContext.Provider>
  )
}
