import React, { createContext, useState, useEffect } from 'react';
export const MovieContext = createContext();
import axios from 'axios';

const API_KEY = 'e7c637c3';

const MovieApp = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const userinfo = JSON.parse(localStorage.getItem('user_info'));

  useEffect(() => {
    if(userinfo){
      
  axios.interceptors.request.use(config=>{
    config.headers.Authorization = `${userinfo.token}`;
    return config;
  }, error => {
    return Promise.reject(error);
  });
    const payload={
      "id": userinfo.id
    }
    axios.post('http://localhost:5000/fav/getFav', payload)
    .then(function (response) {
      setFavorites(response.data.favourites);
    })
    .catch(function (err) {
      console.log(err.response.data);
    });}
  },[])


  const removeFavoriteMovie = (movie) => {
    movie.isFavorite = false;
    const newFavoriteList = favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    let remPayload = {"id": userinfo.id, "imdbID": movie.imdbID};
    axios.post('http://localhost:5000/fav/remFav',remPayload)
    .then((response) => {
      // console.log(response);
    })
    .catch((err) => {console.log(err.response.data);})
  };

  const addFavoriteMovie = (movie) => {
    movie.isFavorite = true;
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    let postPayload = {"id": userinfo.id, "movie": movie};
    axios.post('http://localhost:5000/fav/postFav',postPayload)
    .then((response) => {
      // console.log(response);
    })
    .catch((err) => {console.log(err.response.data);})
  };

  const favoriteHandler = (movie, e) => {
    e.preventDefault();
    // console.log(movie);
    if (favorites.includes(movie)) {
      removeFavoriteMovie(movie);
    } else {
      addFavoriteMovie(movie);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        favoriteHandler
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieApp;
