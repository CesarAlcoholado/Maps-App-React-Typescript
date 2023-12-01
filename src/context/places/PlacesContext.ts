/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

export interface PlacesContextProps {
  isLoading: boolean,
  userLocation?: [ number, number ],
  searchPlaces: (query: string) => Promise<any>
}


export const PlacesContext = createContext <PlacesContextProps> ({} as PlacesContextProps)