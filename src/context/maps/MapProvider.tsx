import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { useReducer } from "react";
import { mapReducer } from "./MapReducer";

export interface MapState {
  mapReady: boolean,
  map?: Map
}

const INITIAL_STATE: MapState = {
  mapReady: false,
  map: undefined
}


interface Props {
  children: JSX.Element | JSX.Element [];
}

export const MapProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

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
