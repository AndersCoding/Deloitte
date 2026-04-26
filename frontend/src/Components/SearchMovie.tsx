import React from 'react'
import { useState } from 'react';

interface Movie {
    title: string;
    episode_id: number;
}

interface MovieSearchProps{
    movies: Movie[];
}

export default function SearchMovie({movies}: MovieSearchProps) {
    

const [searchText, setSearchText] = useState("");

const filteredMovies =
  searchText.trim() === ""
    ? []
    : movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
      );
  return (
    <div>
      <h3>Search for movies</h3>
        <input 
            type="text" 
            placeholder="Search movies..." 
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)}
        />
        <ul>
            {filteredMovies.map(movie => (
                <li key={movie.episode_id}>{movie.title}</li>
            ))}
        </ul>
    </div>
  )
}
