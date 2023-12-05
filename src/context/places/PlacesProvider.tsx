import { useEffect, useReducer } from "react"
import { PlacesContext } from "./PlacesContext"
import { placesReducer } from "./PlacesReducer"
import { getUserLocation } from "../../helpers"
import { searchApi } from "../../apis"
import { Feature, PlacesResponse } from "../../interfaces/Places"

export interface PlacesState {
  isLoading: boolean,
  userLocation?: [ number, number ],
  isLoadingPlaces: boolean,
  places: Feature[]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: Props)=> {

  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then(lnglat => dispatch ({type: "SET_USER_LOCATION", payload: lnglat}))
  }, [])
  
  const searchPlaces = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({type: 'SET_PLACES', payload: []})
      return []
    }
    if (!state.userLocation) throw new Error ('No location detected');

    dispatch({type: 'SET_LOADING_PLACES'});

    const result = await searchApi.get<PlacesResponse>(`/${query}.json`)

    dispatch({type: 'SET_PLACES', payload: result.data.features})
    return result.data.features
  }

  return (
    <PlacesContext.Provider value={{
      ...state,

      //methods
      searchPlaces
    }}>
      {children}
    </PlacesContext.Provider>
  )
}
