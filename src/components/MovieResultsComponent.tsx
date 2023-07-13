// import './MovieResultsComponent.css'

import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios'
import { MovieSearchResult } from '../types/MovieTypes'
import debounce from 'lodash/debounce'
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

// http://localhost:5173/search/film?query=spiderman

type QueryProps = {
  query: string
}

const MovieResultsComponent: React.FC<QueryProps> = ({query}) => {

  const [movies, setMovies] = useState<MovieSearchResult>()
  const [storedQuery, setStoredQuery] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null)

  const navigate = useNavigate();

  const observer = useRef(
    new IntersectionObserver(
      debounce((entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPage((num) => num + 1);
        }
      }, 500) 
    )
  );

  useEffect(() => {
    setIsMounted(true);
  }, [])

  useEffect(() => {

    if (isMounted) {
      if (page) {
        if (storedQuery && storedQuery !== query) {
          setMovies(undefined)
          setLastElement(null)
          setPage(1)
        } 
        fetchFilms(page)
      }
    }
  },[query, isMounted, page])

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
    setStoredQuery(query)
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
          <div key={movie.id} onClick={() => navigate(`/m/entry?id=${movie.id}`)}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <div ref={movieList.page < movieList.total_pages ? setLastElement : undefined}>{movie.title}</div>
          </div>
        )
        })}
        {isLoading && <div className={isLoading ? "loading" : ""}>Loading...</div>}
      </React.Fragment>
    );
  };

  return (
    <div className="MovieResultsComponent">

      <h2>Results in Films for: {query}</h2>
      {movies && <div>{printFilms(movies)}</div>}
      {movies && movies.total_pages <= movies.page && <div id="end">You've the reached the end</div>}
    </div>
  )
}


export default MovieResultsComponent

