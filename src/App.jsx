import React, { useState } from "react";
import { useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";


const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=fe2f5bdc"



const App = () => {

    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies('')
    }, [])

    return (
        <div className="app">
            <h1>MovieManiaa</h1>

            <div className="search">
                <input type="text"
                    placeholder="Search for movies, shows or series"
                    value={search}
                    onChange={(e) => {setSearch(e.target.value)}}
                />
                <img src={SearchIcon} 
                alt="search" 
                onClick={()=>searchMovies(search)}
                />
            </div>

            {movies?.length > 0 ?
                (
                    <div className="container">
                        <div className="empty">
                            <h2> Results for {search}</h2>
                        </div>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}

                    </div>
                ) :
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}


        </div>
    )
}



export default App;