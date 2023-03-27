// import './EntryDisplayPage.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomePageSettings from '../components/HomePageSettings'
import SearchBar from '../components/SearchBar'
import UserFeed from '../components/UserFeed'
import { MovieEntry, ProductionCompany } from '../types/MovieTypes';


function EntryDisplayPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [filmData, setFilmData] = useState<MovieEntry>()
    // const [filmData, setFilmData] = useState()
    const [isMounted, setIsMounted] = useState(false);
    
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('id') ?? ''
    
    useEffect(() => {
        setIsMounted(true);
    }, [])
    
    useEffect(() => {
        if (isMounted) {
            fetchFilms(query)
        }
    },[query, isMounted])
    const fetchFilms = async (query:string) => {
        setIsLoading(true);
        await axios.get(`${import.meta.env.VITE_MOVIE_DB_URL}/${import.meta.env.VITE_MOVIE_DB_URL_MOVIE}/${query}`, {
          params: {
            api_key: import.meta.env.VITE_MOVIE_DB_KEY,
          },
        })
        .then( res => {
          console.log(res.data)
          setFilmData(res.data)
          // console.log(res.data)
        }) 
        .catch( err => {
          console.log(err)
          // TODO: handle error!
        })
        setIsLoading(false)
    }

    const renderFilm = (film:MovieEntry) => {
        return (
            <React.Fragment>
                <div>

                    <div className="">

                        {film.title}
                    </div>
                    <div className="">
                        {film.overview}

                    </div>
                    <div className="">
                        <img src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} alt={film.title} />

                    </div>
                    <div className="">
                        {film.release_date}

                    </div>
                    <div className="">
                        Production Companies
                        {film.production_companies.map((company:ProductionCompany) => {
                            return (
                                <div className="">
                                    {company.name}
                                    <img src={`https://image.tmdb.org/t/p/w92${company.logo_path}`} alt={company.name} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </React.Fragment>
        )
    }
  return (
    <div className="EntryDisplayPage">
      <SearchBar></SearchBar>
        {filmData && renderFilm(filmData)}
    </div>
  )
  
}

export default EntryDisplayPage
