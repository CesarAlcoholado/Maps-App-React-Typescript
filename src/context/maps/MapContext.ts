import { Map } from "mapbox-gl";
import { createContext } from "react";

interface MapContextProps {
  mapReady: boolean,
  map?: Map,

  //methods
  setMap: (map: Map)=> void
}


export const MapContext = createContext ({} as MapContextProps);