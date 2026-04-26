import { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./Components/InfoBox";
import axios from "axios";
import SearchMovie from "./Components/SearchMovie";

interface Movie {
  title: string;
  episode_id: number;
}
function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://swapi.info/api/films/");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <InfoBox />
      <section id="center">
        <h3>Deloitte Account</h3>
        <SearchMovie movies={movies} />
      </section>
    </>
  );
}

export default App;
