import React, { useEffect, useState } from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import axios from "axios";
import { UserContext } from "./Context/UserContext";
import Search from "./components/Search";
import Movies from "./components/Movies"; 
import Movie from "./components/Movie";

import './App.scss';

const App = React.memo( () => {
  const [data, setData] = useState([])
  const [restAPI, setRestAPI] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    const url = "https://wookie.codesubmit.io/movies"
    const search = "https://wookie.codesubmit.io/movies?q="
    const token = 'Bearer Wookie2021';
    var api_headers={ 
      headers: {
        'Authorization': token,
      },
    }

    function fetchData(api, input) {
      fetch(api+input, api_headers).then(res => res.json())
      .then(data => {
        setIsloading(false)
        return data
      })
      .then((data)=> {
        const genres = data.movies.reduce((acc, item) => {
          const obj = {}
          item.genres.forEach(genreType => {
            const bool = acc.every(i => i.name !== genreType)
            if (bool) obj.name = genreType;})
          Object.keys(obj).length && acc.push(obj)
          return acc
        },[])

        genres.forEach(i => i.movies = data.movies.filter(item => item.genres.includes(i.name)))
        setData(genres)
        setRestAPI(data)
      })
    }
    // fetchData = debounce(fetchData, 1000)
    fetchData(search, input)
  }, [input])

  return (
    <div className="App">
      {
        !isLoading &&
        <UserContext.Provider value={{data, restAPI, input, setInput}}>
          <div className="nav-bar-wrapper">
            <Search /> 
          </div>
          <Switch>
            <Route exact path="/:movie" >
              {input? <Redirect to="/" /> : <Movie />}  
            </Route>
            <Route path="/" component={Movies}/>  
          </Switch>
        </UserContext.Provider>
      }
    </div>
  );
})

export default App;
