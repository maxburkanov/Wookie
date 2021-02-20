import React, {useContext, memo} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default memo( () => {
  const {data, setInput} = useContext(UserContext)

  return (
    <div className="main-wrapper">
      {
        data && data.map((i, idx) => {
          return (
            <>
              <div key={idx} className="list-of-genres">
                {
                  i.name
                }
              </div>
              <div className="list-of-movies">
                {
                  i.movies.map(i => {
                    const {poster, id, slug} = i
                    const obj = { pathname: `/${slug}` }
                    return (
                      <Link to={obj} key={id} onClick={()=> setInput("") } >
                        <img src={poster} className="movie-poster" />
                      </Link>
                    )
                  })
                }
              </div>
            </>
          )
        })
      }
    </div>
  )
}, (prevState, nextState) => {
  if (prevState !== nextState) return true
  return false
})