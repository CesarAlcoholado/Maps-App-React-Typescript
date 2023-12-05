import { MapContext, PlacesContext } from "../../context"
import { Feature } from "../../interfaces/Places";
import { useContext, useState } from "react"
import { LoadingPlaces } from "..";

export const SearchResults = () => {
  const [activeId, setActiveId] = useState('')

  const { places, isLoadingPlaces } = useContext(PlacesContext);
  const { map } = useContext(MapContext);

  const handlePlaceClick = (place: Feature) => {
    setActiveId(place.id)
    const [lng, lat] = place.center;
    map?.flyTo({
      zoom: 14,
      center: [lng, lat]
    })
  }

  if(isLoadingPlaces) return (<LoadingPlaces/>)

  if(places.length === 0) return <></>

  return (
    <ul className="list-group mt-3">
      { places.map((place)=> (
        <li className={`${(activeId === place.id) ? 'bg-primary text-white' : ''} list-group-item list-group-item-action`} key={place.id} style={{cursor: "pointer"}} onClick={()=> handlePlaceClick(place)}>
          <h6 className={`${(activeId === place.id) ? 'text-white' : ''}`}>{place.text_en}</h6>
          <p
          style={{fontSize: "12px"}}>
            {place.place_name}
          </p>
        <button className={`${(activeId === place.id) ? 'btn-outline-light' : 'btn-outline-dark'} btn btn-sm`}>Directions</button>
        </li>
      )
      )
    }
    </ul>
  )
}
