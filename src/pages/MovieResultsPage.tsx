// import './MovieResultsPage.css'


/*
    Here are the general steps to implement infinite scrolling using the IntersectionObserver API:

    Add a ref to the last item in the list to observe when it becomes visible.
    Initialize an IntersectionObserver instance with a callback function that will be called when the observed item becomes visible.
    In the callback function, check if the intersection ratio is greater than zero, which indicates that the item is visible.
    If the item is visible, fetch the next page of data and add it to the current list.
*/


import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { MovieSearchResult } from '../types/MovieTypes'

const MovieResultsPage: React.FC = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query:string = queryParams.get('query') ?? '';

  const [movies, setMovies] = useState<MovieSearchResult>()
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchFilms(page)
  },[query, page])

  const fetchFilms = async (pageNum: number) => {
    await axios.get(`${import.meta.env.VITE_MOVIE_DB_URL}/${import.meta.env.VITE_MOVIE_DB_URL_SEARCH}`, {
      params: {
        api_key: import.meta.env.VITE_MOVIE_DB_KEY,
        query: query,
        page:page
      },
    })
    .then( res => {
      setMovies(res.data)
      console.log(res.data)
    }) 
    .catch( err => {
      console.log(err)
      // TODO: handle error!
    })
  }
  
  const printFilms = (movieList: MovieSearchResult) => {
    return (
      <React.Fragment>
        {movieList.results.map((movie) => {
          if (!movie.poster_path) {
            return null;
          }
        return(
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <div>{movie.title}</div>
          </li>
        )
        })}
      </React.Fragment>
    );
  };

  return (
    <div className="MovieResultsPage">
      THIS IS MovieResultsPage
      <h2>Search Results for: {query}</h2>
      <ul>
      {movies && printFilms(movies)}
      </ul>
    </div>
  )
}


export default MovieResultsPage

