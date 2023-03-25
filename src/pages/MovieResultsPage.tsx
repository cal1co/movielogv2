// import './MovieResultsPage.css'

import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { MovieSearchResult } from '../types/MovieTypes'
import debounce from 'lodash/debounce'

// http://localhost:5173/search/film?query=spiderman

const MovieResultsPage: React.FC = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query:string = queryParams.get('q') ?? '';

  const [movies, setMovies] = useState<MovieSearchResult>()
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null)

  const observer = useRef(
    new IntersectionObserver(
      debounce((entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPage((num) => num + 1);
        }
      }, 500) // Delay the function call by 500ms
    )
  );

  useEffect(() => {
    setIsMounted(true);
  }, [])

  useEffect(() => {
    if (isMounted) {
      if (page )
      fetchFilms(page)
    }
  },[query, page, isMounted])

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement)
      }
    }
  }, [lastElement])

  const fetchFilms = async (pageNum: number) => {
    setIsLoading(true);
    await axios.get(`${import.meta.env.VITE_MOVIE_DB_URL}/${import.meta.env.VITE_MOVIE_DB_URL_SEARCH}`, {
      params: {
        api_key: import.meta.env.VITE_MOVIE_DB_KEY,
        query: query,
        page:pageNum
      },
    })
    .then( res => {
      setMovies(prevMovies => {
        if (!prevMovies) {
          return res.data
        } else {
          const updatedResults = prevMovies ? prevMovies.results.concat(res.data.results) : res.data;
          return {
            ...res.data,
            results: updatedResults,
          };
        }
      })
      console.log(res.data)
    }) 
    .catch( err => {
      console.log(err)
      // TODO: handle error!
    })
    setIsLoading(false)
  }
  
  const printFilms = (movieList: MovieSearchResult) => {
    return (
      <React.Fragment>
        {movieList.results.map((movie, idx) => {
          if (!movie.poster_path) {
            return null;
          }
        return(
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <div ref={movieList.page < movieList.total_pages ? setLastElement : undefined}>{movie.title}</div>
          </li>
        )
        })}
        {isLoading && <div className={isLoading ? "loading" : ""}>Loading...</div>}
      </React.Fragment>
    );
  };

  return (
    <div className="MovieResultsPage">
      THIS IS MovieResultsPage
      <h2>Search Results for: {query}</h2>
      {movies && printFilms(movies)}
      {movies && movies.total_pages <= movies.page && <div id="end">You've the reached the end</div>}
    </div>
  )
}


export default MovieResultsPage

