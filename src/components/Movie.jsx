import React, { useContext, memo, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { withRouter } from 'react-router-dom';
import  moment  from "moment";
import { BsFillStarFill } from "react-icons/bs";

export default withRouter( memo( (props) => {
  const { restAPI } = useContext(UserContext)
  const [item, setItem] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(()=> {

    const findMovie = async() => {
      const item = await restAPI.movies && restAPI.movies.find(i => {
        return "/"+i.slug === props.match.url 
      })
      await setItem(item)
      await setLoading(false)
    }
    findMovie()

  }, [restAPI])

    const dt = moment(item && item.released_on).format("DD/MM/YYYY");
    // console.log(props.match.url)
  return (
    <>
    {
     !loading && 
      <div className="movie-main">
        <div className="movie-left">
          <img src={item.backdrop} alt="" style={{ width:"40vw" }} />
        </div> 
        <div className="movie-right">
          <div className="movie-right-header">
            <div className="movie-title"> {item.title} </div>
            <div className="movie-rating"> 
              <BsFillStarFill  style={{color: "gold"}} /> {" "}
              { item.imdb_rating }
            </div>
          </div>
          
          <div className="movie-cast"> 
            <div> 
              {
                dt
              } {" | "}
              {
                item.length
              } {" | "}
              {
                Array.isArray(item.director)? item.director.join(' ') : item.director
              }
            </div>
            <div>
              cast {
                item.cast.join(' | ')
              }
            </div>
          </div>
          <div className="movie-desc"> { item.overview} </div>
        </div>
      </div>
    }
    </>
  );
}, (prev, next)=>{
  if (prev !== next) return true
  return false
}))



