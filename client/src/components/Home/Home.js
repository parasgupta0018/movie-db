import React,{ useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import './Home.css';
import Movie from "./Movie";
import Search from "./Search";
import axios from 'axios'
import { MovieContext } from "../context/MovieContext";

function Home(props) {

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [empty, setEmpty] = useState(true);
  const userinfo = JSON.parse(localStorage.getItem('user_info'));
  const {favorites, favoriteHandler} = useContext(MovieContext);


  useEffect(() => {
        if(!userinfo){
            props.updateTitle('Login')
            props.history.push('/login');
        }
    },[props.history]);

    function redirectToLogin() {
      props.history.push('/login');
    }
    const search = searchValue => {
  
      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=e7c637c3`)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.Response === "True") {
            setMovies(jsonResponse.Search);
            setLoading(false);
          } else {
            if(searchValue != "") setErrorMessage(jsonResponse.Error);
            else setMovies([]);
            setLoading(false);
          }
        });
      };
    return(
        <div style={{width:'80%'}} className="mt-4">
            <Search search={search} setEmpty={setEmpty} setLoading={setLoading} setErrorMessage={setErrorMessage}/>
            <div className="movies" style={{placeContent: 'center'}}>
              {loading && !errorMessage ? (
                empty ? <span>Start typing to get Movies...</span> : <div className="spinner-border" role="status"><span className="sr-only"></span></div>
              ) : errorMessage ? (
                <div className="errorMessage">{errorMessage}</div>
              ) : ( (Array.isArray(movies) && movies.length) ? 
                movies.map((movie, index) => (
                  <Movie key={`${index}-${movie.Title}`} favorites={favorites} movie={movie} addFavorite={(e) => favoriteHandler(movie, e)} />
                )) : <div>Start typing to get Movies...</div>
              )}
            </div>
        </div>
    )
}

export default withRouter(Home);