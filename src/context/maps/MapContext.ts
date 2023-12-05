import { createContext } from "react";
import { Map } from "mapbox-gl";

interface MapContextProps {
  mapReady: boolean,
  map?: Map,

  //methods
  setMap: (map: Map)=> void,
  getRouteBetween: (start: [number, number], end: [number, number]) => Promise<void>
}


export const MapContext = createContext ({} as MapContextProps);