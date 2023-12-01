import { ChangeEvent, useContext, useRef } from "react";
import { PlacesContext } from "../../context";
import "./SearchBar.css";

export const SearchBar = () => {
  const { searchPlaces } = useContext(PlacesContext);
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleQuery = (event: ChangeEvent<HTMLInputElement> ) => {
    if (debounceRef.current)
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(()=>{
      //buscar o ejecutar consulta
    searchPlaces(event.target.value)
    }, 350)
  }

  return (
    <div className="search-container">
      <input
       type="text"
       className="form-control"
       placeholder="search location..."
       onChange={handleQuery}
       />
    </div>
  )
}
