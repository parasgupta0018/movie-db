import React, { useContext } from 'react';
import './Favorite.css';
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { MovieContext } from "../context/MovieContext";

const Favourite = () => {
  const {favorites, favoriteHandler} = useContext(MovieContext);
  const noImage =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


  return (
    <>
      {favorites?.length ? (
        <div className='favorites'>
          {favorites.map((movie, index) => (
            <div  key={`${index}-${movie.Title}`} className='movie-card'>
              <div className='icon' onClick={(e)=>{favoriteHandler(movie,e);}}>
                {movie.isFavorite ? (
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
          ))}
        </div>
      ) : (
        <div className='favorite_warning mt-4'> No Favourite Movie.</div>
      )}
    </>
  );
};

export default Favourite;
