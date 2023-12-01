import { useEffect, useReducer } from "react"
import { PlacesContext } from "./PlacesContext"
import { placesReducer } from "./PlacesReducer"
import { getUserLocation } from "../../helpers"
import { searchApi } from "../../apis"

export interface PlacesState {
  isLoading: boolean,
  userLocation?: [ number, number ]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: Props)=> {

  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then(lnglat => dispatch ({type: "SET_USER_LOCATION", payload: lnglat}))
  }, [])
  
  const searchPlaces = async (query: string) => {
    if (query.length === 0) return []; //limpio el state
    if (!state.userLocation) throw new Error ('No location detected');

    const result = await searchApi.get(`/${query}.json`)

    return result.data
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
