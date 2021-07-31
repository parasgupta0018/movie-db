import React from "react";
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";


const noImage =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const Movie = ({ favorites, movie, addFavorite }) => {
  return (
    <div className='movie-card'>
      <div className='icon' onClick={addFavorite}>
        {favorites.find(fav => fav.imdbID == movie.imdbID) ? (
          <i>
            <BsStarFill className="bsStarFill"/>
          </i>
        ) : (
          <i>
            <BsStar className="bsStar" />
          </i>
        )}
      </div>
      {movie.Poster === 'N/A' ? (
        <img src={noImage} alt={movie.Title} />
      ) : (
        <img src={movie.Poster} alt={movie.Title} />
      )}

      <div className='info'>
        <span className='title' data-toggle="tooltip" data-placement="top" title={movie.Title}>{movie.Title}</span>
        <span className='year'>{movie.Year}</span>
      </div>
    </div>
  );
};


export default Movie;