import { useEffect, useState } from "react";
import MovieList from "./components/MovieList/MovieList";
import Card from "./components/UI/Card";
import Navigation from "./components/UI/Navigation";
import { Movie } from "./store/types";

function App() {
  const [moviesList, setMoviesList] = useState<Array<Movie> | null>(null);
  const [hasError, setHasError] = useState(false);

  function selectMovieHandler(movie: Movie) {}

  async function fetchMovies() {
    try {
      //Todo fetch movies from API
      setMoviesList([
        {
          id: 1,
          title: "A Movie",
          genre: "Action",
          logo_url:
            "https://www.altavod.com/assets/images/poster-placeholder.png",
          origin_country: "Venezuela",
          release_date: "13-3-2023",
          description: "This is a movie!",
          popularity: 10,
        },
      ]);
    } catch (error) {
      setHasError(true);
      if (error instanceof Error) console.log(error.message);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Card>
      <Navigation />
      {!hasError && moviesList && (
        <MovieList list={moviesList} onSelect={selectMovieHandler} />
      )}
    </Card>
  );
}

export default App;
