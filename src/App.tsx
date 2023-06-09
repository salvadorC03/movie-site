import { useEffect, useState } from "react";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import MovieList from "./components/MovieList/MovieList";
import Card from "./components/UI/Card";
import Navigation from "./components/UI/Navigation";
import { Movie, Show } from "./store/types";
import classes from "./App.module.css";
import UserSideBar from "./components/UserSideBar/UserSideBar";
import ShowList from "./components/ShowList/ShowList";
import { fetchMovies, fetchShows } from "./store/api";
import CircularProgress from "@mui/material/CircularProgress";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button } from "@mui/material";
import ShowDetails from "./components/ShowDetails/ShowDetails";

function App() {
  const [moviesList, setMoviesList] = useState<Array<Movie> | null>(null);
  const [showsList, setShowsList] = useState<Array<Show> | null>(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  function selectMovieHandler(movie: Movie) {
    setSelectedMovie(movie);
  }

  function selectShowHandler(show: Show) {
    setSelectedShow(show);
  }

  function closeMovieDetailsHandler() {
    setSelectedMovie(null);
  }

  function closeShowDetailsHandler() {
    setSelectedShow(null);
  }

  async function fetchData() {
    setHasError(false);
    setLoading(true);
    try {
      const moviesList = await fetchMovies();
      setMoviesList(moviesList);

      const showsList = await fetchShows();
      setShowsList(showsList);
    } catch (error) {
      setHasError(true);
      if (error instanceof Error) console.log(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      {!loading && !hasError && (
        <main className={classes.main}>
          {selectedMovie ? (
            <>
              <Navigation />
              <MovieDetails
                movie={selectedMovie}
                onClose={closeMovieDetailsHandler}
              />
            </>
          ) : selectedShow ? (
            <>
              <Navigation />
              <ShowDetails
                show={selectedShow}
                onClose={closeShowDetailsHandler}
              />
            </>
          ) : (
            <div className={classes["card-group"]}>
              <div className={classes["left-side"]}>
                <Navigation />
                {showsList && (
                  <ShowList list={showsList} onSelect={selectShowHandler} />
                )}
                {moviesList && (
                  <MovieList list={moviesList} onSelect={selectMovieHandler} />
                )}
              </div>
              <input
                type="checkbox"
                id="toggle-nav"
                className={classes["toggle-nav"]}
              />
              <div className={`${classes["right-side"]}`}>
                <UserSideBar />
              </div>
            </div>
          )}
        </main>
      )}
      {hasError && (
        <div className={classes.centered}>
          <div>
            <h1>Loading failed.</h1>
            <Button
              variant="contained"
              className={classes["retry-button"]}
              onClick={fetchData}
            >
              <ReplayIcon />
              <p>Retry</p>
            </Button>
          </div>
        </div>
      )}
      {loading && (
        <div className={classes.centered}>
          <CircularProgress />
        </div>
      )}
    </Card>
  );
}

export default App;
