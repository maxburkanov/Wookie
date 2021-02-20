import React, {useContext, memo} from "react";
import { UserContext } from "../Context/UserContext";
import { debounce } from "../debounce/debounce";


export default memo( () => {
  const { setInput } = useContext(UserContext)
  
  const handleInput = (e) => {
    setInput(e.target.value)
  }
  
  const debounced = debounce(handleInput, 300)

  return (
    <div className="nav-bar">
      <div className="nav-bar-title">WOOKIE MOVIES</div>
      <div>
        <input placeholder="Serch..." onChange={debounced} />
      </div>
    </div>
  )
}, 
  (prevProps, nextProps) => {
    if (prevProps !== nextProps) return true
    return false
} )
