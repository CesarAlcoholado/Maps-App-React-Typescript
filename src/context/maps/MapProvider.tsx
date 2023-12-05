//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";
import { DirectionsResponse } from "../../interfaces/Directions";
import { useContext, useEffect, useReducer } from "react";
import { directionsApi } from "../../apis";
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

  const getRouteBetween = async (start: [number, number], end: [number, number]) => {
    const response = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
    
    const { distance, duration, geometry } = response.data.routes[0]
    const {coordinates: coords } = geometry;
    // const kms = (Math.round((distance / 1000)*100))/100;
    // const minutes = Math.floor(duration / 60);

    const bounds = new LngLatBounds(
      start,
      start
    );

    for ( const coord of coords) {
      const newCoord : [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }

    state.map?.fitBounds(bounds, {
      padding: 150
    })

    //*polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: "FeatureCollection",
        features: [{
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coords
          }
        }]
      }
    }

    //! Elimino polyline si existe
    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString')
    }
    
    state.map?.addSource('RouteString', sourceData);

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'blue',
        'line-width': 3
      }
    })
  }

  return (
    <MapContext.Provider value={{
      ...state,
      //methods
      setMap,
      getRouteBetween
    }}>
      { children }
    </MapContext.Provider>
  )
}
